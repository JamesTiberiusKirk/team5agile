
const { Db } = require('./db/db');
const { Server } = require('./server');

let db = new Db().then(()=>{
  let server = new Server(db);
});
