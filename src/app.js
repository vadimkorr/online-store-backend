const express = require('express');

const dbService = require('./shared/services/db');
const consts = require('./shared/consts');
const productsController = require('@controllers').products;
const ordersController = require('@controllers').orders;

const app = express();

dbService.initDb(consts.server.DB_PATH);

// app.use(bodyParser.json());
app.use('/products', express.static('products'));

app.use('/api/v1/products', productsController);
app.use('/api/v1/orders', ordersController);

module.exports = app;
