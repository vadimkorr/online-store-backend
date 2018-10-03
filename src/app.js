const express = require('express');

const _dbService = require('./shared/services/db');
const _consts = require('./shared/consts');
const _productsController = require('@controllers').products;

const app = express();

_dbService.initDb(_consts.server.DB_PATH);

// app.use(bodyParser.json());

/* Products API */
app.get('/api/v1/products', _productsController.getProducts);
app.get('/api/v1/products/:id', _productsController.getProduct);

module.exports = app;
