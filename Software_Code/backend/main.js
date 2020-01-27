const express = require('express');
const bodyParser = require('body-parser');

const { Db } = require('./db/db');

const app = express();


db = new Db();

// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id');
  res.header('Access-Control-Expose-Headers', 'x-access-token, x-refresh-token');

  next();
});
app.use(bodyParser.json());


// Routes
app.get('/', (req, res) => {
  res.status(200).send('ok');
  console.log('[GET] /');
});


app.post('/provider/add', (req, res) => {
  let newPrv;
  let sql = '';
  try {
    let bodyData = req.body;
    
    newPrv = {
      provider_ID: bodyData.provider_ID,
      provider_Name: bodyData.provider_Name,
      provider_StreetAdd: bodyData.provider_StreetAdd,
      provider_City: bodyData.provider_City,
      provider_State: bodyData.provider_State,
      provider_referral: bodyData.provider_referral
    };


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
