var util = require('util');
var request = require('request');

function querySchedule(info, callback) {
    var url = util.format('https://kyfw.12306.cn/otn/czxx/queryByTrainNo?train_no=%s&from_station_telecode=%s&to_station_telecode=%s&depart_date=%s',
        info.trainNo,
        info.from,
        info.to,
        info.tripDate);
    request({
        url: url,
        strictSSL: false,
        type: 'json'
    }, function(err, res, body) {
        if (!body) {
            body = '-1';
        }
        var scheduleData = JSON.parse(body);
        if (!err &&
            res.statusCode == 200 &&
            scheduleData.hasOwnProperty('httpstatus') &&
            scheduleData['httpstatus'] == 200 &
            scheduleData.hasOwnProperty('status') &&
            scheduleData['status']) {
            callback(null, handleSchedule(info.tripDate, scheduleData.data.data));
        } else {
            callback({
                err: err,
                statusCode: res.statusCode,
                body: body
            });
        }
    });
}

function handleSchedule(date, schedule) {
    var lastArrive = schedule[0].start_time;
    var str = date + "T" + lastArrive + "+08:00";
    var date = new Date(str);
    for (var i = 1; i < schedule.length; i++) {
        var info = schedule[i];
        var num = info.arrive_time.split(':');
        if (info.arrive_time < lastArrive) {
            date.setDate(date.getDate() + 1);
        }
        date.setHours(num[0]);
        date.setMinutes(num[1]);
        info['timeStamp'] = date.getTime();
        lastArrive = info.arrive_time;
    }
    return schedule;
}

module.exports = {
    querySchedule: querySchedule
}
