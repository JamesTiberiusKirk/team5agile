const express = require('express');
const bodyParser = require('body-parser');

const { Db } = require('./db/db');

const app = express();

db = new Db();

// Helper functions
function log(req, res) {
  console.log(`[${req.method}] ${req.url}`);
}

// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id');
  res.header('Access-Control-Expose-Headers', 'x-access-token, x-refresh-token');
  log(req, res);
  next();
});
app.use(bodyParser.json());


// Routes
app.get('/zip2coords', (req, res) => {
  let zip = req.query.zip;
  if (zip) {
    let sql = `SELECT * FROM healthcare.zip_coords WHERE zip_Code=${zip}`;
    db.conn.query(sql, (err, result) => {
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

app.get('/providers', (req, res) => {
  let queryParams = req.query.search_query;
  if (queryParams) {
    let sql = `SELECT * FROM healthcare.provider WHERE provider_Name LIKE "%${queryParams}%" OR provider_ID="${queryParams}";`
    db.conn.query(sql, (err, result) => {
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

app.get('/procedures', (req, res) => {
  let queryParams = req.query.search_query;
  if (queryParams) {
    let sql = `CALL sortRefineOptions("${queryParams}","${queryParams}","","","avg_Covered_Charges","ASC");`
    db.conn.query(sql, (err, result) => {
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

var server = app.listen(3000, () => {
  var port = server.address().port;
  console.log('Example app listening at port %s', port);
});

module.exports = server;
