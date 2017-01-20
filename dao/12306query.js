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
        var schedule = JSON.parse(body);
        if (!err &&
            res.statusCode == 200 &&
            schedule.hasOwnProperty('httpstatus') &&
            schedule['httpstatus'] == 200 &
            schedule.hasOwnProperty('status') &&
            schedule['status']) {
            callback(null, schedule.data.data);
        } else {
            callback({
                err: err,
                statusCode: res.statusCode,
                body: body
            });
        }
    });
}

module.exports = {
    querySchedule: querySchedule
}
