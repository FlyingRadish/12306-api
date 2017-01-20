var db = require('./database');

var trainSql = {
    insert: 'INSERT INTO train(trip_date, train, trip_from, trip_to, train_no) Values(?,?,?,?,?);',
    select: 'SELECT * FROM train WHERE train=? AND trip_date=?'
};

var train = {
    queryByTrainAndDate: function(train, date, callback) {
        db.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(trainSql.select, [train, date], function(error, results, fields) {
                if (error) {
                    callback(err);
                } else {
                    callback(null, results);
                }
                connection.release();
            });
        })
    }
};

module.exports = train;
