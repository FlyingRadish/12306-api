var db = require('./database');

var stationSql = {
    insert: 'INSERT INTO station(name,telecode,pinyin_full, pinyin_short) Values(?,?,?,?);',
    selectByName: 'SELECT * FROM station WHERE name=?;',
};

var station = {
    queryByName: function(name, callback) {
        db.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(stationSql.selectByName, [name], function(error, results, fields) {
                if (error) {
                    callback(err);
                } else {
                    callback(null, results);
                }
                connection.release();
            });
        })
    },
    queryByNameAsync: function(name) {
        return function(cb) {
            db.getConnection(function(err, connection) {
                if (err) {
                    cb(err);
                    return;
                }
                connection.query(stationSql.selectByName, [name], function(error, results, fields) {
                    connection.release();
                    if (error) {
                        cb(err);
                    } else {
                        cb(null, results);
                    }
                });
            })
        };
    }
};

module.exports = station;
