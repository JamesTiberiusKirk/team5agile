const mysql = require('mysql');

const db_config = require('../config/db.config');

class Db {
    constructor() {
        this.conn;
        this.initConnection();
        this.handleConnection();
        // this.handleError();
    }

    initConnection() {
        this.conn = mysql.createConnection(db_config);
    }

    handleConnection(){
        this.conn.connect((err) => {
            if (err) {
                console.error('MySql error connecting: ' + err.stack);
                return;
            }

            console.log('MySql connected...');
        });
    }

//     handleError(){
//         this.conn.on('error',(err)=>{
//             if(err.code === 'PROTOCOL_CONNECTION_LOST') {
//                 this.initConnection();
//             } else {
//                 throw err;
//             }
//         });
//     }
// }

module.exports = { Db };