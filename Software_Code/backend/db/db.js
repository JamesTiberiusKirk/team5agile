const mysql = require('mysql');

const db_config = require('../config/db.config');

var conn = mysql.createConnection(db_config);


conn.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log|('MySql connected...');    
});


module.exports = { conn };