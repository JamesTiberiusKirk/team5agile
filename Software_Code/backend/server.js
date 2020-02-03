const express = require('express');
const bodyParser = require('body-parser');

// Helper functions
function log(req, res) {
  console.log(`[${req.method}] ${req.url}`);
}

class Server {
  constructor(db) {
    this.db = db;
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
    this.app.get('/', (req, res) => {
      res.status(200).send('OK');
    });

    this.app.get('/zip2coords', (req, res) => {
      let zip = req.query.zip;
      if (zip) {
        let sql = `SELECT * FROM healthcare.zip_coords WHERE zip_Code=${zip}`;
        this.db.conn.query(sql, (err, result) => {
          if (err) {
            res.status(500).send(err);
            return console.log(`[GET] /zip2coords error: ${err}`);
          }
          res.status(200).send(result);
        });
      } else {
        res.status(400).send('Please provide a zip code');
      }
    });

    this.app.get('/providers', (req, res) => {
      let queryParams = req.query.search_query;
      if (queryParams) {
        let sql = `SELECT * FROM healthcare.provider WHERE provider_Name LIKE "%${queryParams}%" OR provider_ID="${queryParams}";`
        this.db.conn.query(sql, (err, result) => {
          if (err) {
            res.status(500).send(err);
            return console.log(`[GET] /providers error: ${err}`);
          }
          res.status(200).send(result);
        });
      } else {
        res.status(405).send('Need to provide a seach query');
      }
    });

    this.app.get('/procedures', (req, res) => {
      let queryParams = req.query.search_query;
      if (queryParams) {
        let sql = `CALL sortRefineOptions("${queryParams}","${queryParams}","","","avg_Covered_Charges","ASC");`
        this.db.conn.query(sql, (err, result) => {
          if (err) {
            res.status(500).send(err);
            return console.log(`[GET] /procedures error: ${err}`);
          }
          res.status(200).send(result);
        });
      } else {
        res.status(405).send('Need to provide a seach query');
      }
    });
  }

  inirServer() {
    let server = this.app.listen(3000, () => {
      console.log(`Example app listening at port 3000`);
    });
  }
}
module.exports = { Server } 