const express = require('express');
const bodyParser = require('body-parser');

const dbService = require('./shared/services/db');
const consts = require('./shared/consts');
const productsController = require('@controllers').products;
const ordersController = require('@controllers').orders;

const app = express();
app.use(bodyParser.json());

dbService.initDb(consts.server.DB_PATH);

app.use('/products', express.static('products'));

app.use('/api/v1/products', productsController);
app.use('/api/v1/orders', ordersController);

module.exports = app;
