const express = require('express');
const app = express();

const { Db } = require('./db/db');

db = new Db();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id');
  res.header('Access-Control-Expose-Headers', 'x-access-token, x-refresh-token');

  next();
});

app.get('/', (req, res) => {
  res.status(200).send('ok');
  console.log('[GET] /');
});


app.post('/provider/add', (req, res) => {
  
});


var server = app.listen(3000, () => {
  var port = server.address().port;
  console.log('Example app listening at port %s', port);
});



module.exports = server;
