const express = require('express');
const bodyParser = require('body-parser');

let { router, setDb } = require('./routes/index');

// Helper functions
function log(req, res) {
  console.log(`[${req.method}] ${req.url}`);
}

class Server {
  constructor(db, port) {
    this.db = db;
    this.port = port;
    this.app = express();
    this.initMiddleware();
    this.initRoutes();
    this.inirServer();
  }

  // Middleware
  initMiddleware() {
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id');
      res.header('Access-Control-Expose-Headers', 'x-access-token, x-refresh-token');
      log(req, res);
      next();
    });
    this.app.use(bodyParser.json());
  }

  // Routes
  initRoutes() {
    setDb(this.db);
    // db = this.db
    this.app.use('/',router);
  }

  inirServer() {
    let server = this.app.listen(this.port, () => {
      console.log(`Example app listening at port ${this.port}`);
    });
  }
}
module.exports = { Server } 