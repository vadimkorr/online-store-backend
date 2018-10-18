const express = require('express');
const bodyParser = require('body-parser');
const handleError = require('@middleware').handleError;
const productsController = require('@controllers').products;
const ordersController = require('@controllers').orders;

module.exports = app => {
  app.use(bodyParser.json());
  app.use('/products', express.static('products'));
  app.use('/api/v1/products', productsController);
  app.use('/api/v1/orders', ordersController);
  app.use(handleError);
};
