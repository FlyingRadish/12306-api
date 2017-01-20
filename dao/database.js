var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: '12306api',
    port: 3306
});

module.exports = {
    pool: pool,
    getConnection: function(callback) {
        pool.getConnection(callback);
    }
};
