
const { Db } = require('./db/db');
const { Server } = require('./server');

let db = new Db();
db.initConnection()
  .then(() => {
    new Server(db,3000);
  }).catch((err) => {
    console.error(err);
  });
