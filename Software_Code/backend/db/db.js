const mysql = require('mysql');

const db_config = require('../config/db.config');

var conn = mysql.createConnection(db_config);

class Db {
    constructor(){
        this.initConnection();
    }

    initConnection(){
        conn.connect(function (err) {
            if (err) {
                console.error('MySql error connecting: ' + err.stack);
                return;
            }
        
            console.log('MySql connected...');    
        });
    }
}

module.exports = { Db };