const mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'api-backend',
    password: 'betterpwd',
    database: 'healthcare'
});


conn.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log|('MySql connected...');    
});


module.exports = { conn };