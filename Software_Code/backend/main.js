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
app.get('/', (req, res) => {
  res.status(200).send('ok');
  console.log('[GET] /');
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

app.post('/provider/add', (req, res) => {
  let newPrv;
  let sql;
  try {
    let bodyData = req.body;

    newPrv = {
      provider_ID: bodyData.provider_ID,
      provider_Name: bodyData.provider_Name,
      provider_StreetAdd: bodyData.provider_StreetAdd,
      provider_City: bodyData.provider_City,
      provider_State: bodyData.provider_State,
      provider_Zip: bodyData.provider_Zip,
      provider_referral: bodyData.provider_referral
    };

    /*
        sql = `INSERT INTO 'provider' ('provider_ID','provider_Name', 
                'provider_StreetAdd', 'provider_City', 'provider_State', 
                'provider_ Zip', 'provider_referral') 
              VALUES ( ${newPrv.provider_ID}, 
                ${newPrv.provider_Name}, 
                ${newPrv.provider_StreetAdd}, 
                ${newPrv.provider_City}, 
                ${newPrv.provider_State} 
                ${newPrv.provider_Zip}, 
                ${newPrv.provider_referral});`
    
        db.conn.query(sql, (err, result) => {
          if (err) return console.log(err);
          console.log(result);
        });
        */
  } catch (e) {
    console.log(`[POST] ${req.url} error: ${e}`);
    return res.status(500).send(e.message);
  }

  res.status(201).send('added')
  console.log(`[POST] ${req.url} 201 ${JSON.stringify(newPrv)}`);

});


var server = app.listen(3000, () => {
  var port = server.address().port;
  console.log('Example app listening at port %s', port);
});

module.exports = server;
