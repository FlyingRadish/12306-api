var express = require('express');
var router = express.Router();
var station = require('../dao/station');
var train = require('../dao/train');
var async = require('async');
var trainQuery = require('../dao/12306query')

function getSchedule(req, clientRes, next) {
    //TODO:log query
    train.queryByTrainAndDate(req.query.train, req.query.date, function(err, trainResult) {
        if (err || trainResult.length < 1) {
            console.log(err);
            clientRes.send({ok:false});
        } else {
            var queries = [];
            queries.push(station.queryByNameAsync(trainResult[0].trip_from));
            queries.push(station.queryByNameAsync(trainResult[0].trip_to));
            async.series(queries, function(err, stationResults) {
                if (err ||
                    stationResults.length < 2 ||
                    stationResults[0].length < 1 ||
                    stationResults[1].length < 1) {
                    console.log(err);
                    clientRes.send({ok:false});
                } else {
                    trainQuery.querySchedule({
                        trainNo: trainResult[0].train_no,
                        from: stationResults[0][0].telecode,
                        to: stationResults[1][0].telecode,
                        tripDate: trainResult[0].trip_date
                    }, function(err, result) {
                        if (err) {
                            console.log(err);
                            clientRes({ok:false});
                        } else {
                            clientRes.send({ok:true, data:result});
                        }
                    })
                }
            })
        }
    })
}

router.get('/schedule', getSchedule);

module.exports = router;
