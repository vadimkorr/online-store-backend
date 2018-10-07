const express = require('express');

const _dbService = require('./shared/services/db');
const _consts = require('./shared/consts');
const productsController = require('@controllers').products;
const adminController = require('@controllers').admin;

const app = express();

_dbService.initDb(_consts.server.DB_PATH);

// app.use(bodyParser.json());
app.use('/products', express.static('products'));

app.use('/api/v1/products', productsController);
app.use('/api/v1/admin', adminController);

module.exports = app;
