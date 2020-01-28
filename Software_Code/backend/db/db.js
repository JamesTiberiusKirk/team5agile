const mysql = require('mysql');

const db_config = require('../config/db.config');

class Db {
    constructor() {
        this.conn = mysql.createConnection(db_config);
        this.initConnection(this.conn);
    }

    initConnection(conn) {
        conn.connect((err) => {
            if (err) {
                console.error('MySql error connecting: ' + err.stack);
                return;
            }

            console.log('MySql connected...');
        });
    }
}

module.exports = { Db };