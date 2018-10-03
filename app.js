const express = require('express');

const _dbService = require('./shared/services/db');
const _consts = require('./shared/consts');

const app = express();

_dbService.initDb(_consts.server.DB_PATH);

// app.use(bodyParser.json());

/* Products API */
app.get('/api/products', (req, res) => {
  res.json({});
});
app.get('/api/products/:id', (req, res) => {
  res.json({});
});

module.exports = app;
