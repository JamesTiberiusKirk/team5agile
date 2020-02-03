
const { Db } = require('./db/db');
const { Server } = require('./server');

let db = new Db();
db.initConnection()
  .then(() => {
    new Server(db);
  }).catch((err) => {
    console.error(err);
  });
