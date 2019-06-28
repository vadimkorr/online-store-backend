const express = require('express');
const bodyParser = require('body-parser');
const handleError = require('@middleware').handleError;
const authController = require('@controllers').auth;
const productsController = require('@controllers').products;
const ordersController = require('@controllers').orders;
const passport = require('passport');
require('@middleware/auth');

module.exports = app => {
  app.use('/products', express.static('products'));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use('/api/v1/auth', authController);
  app.use('/api/v1/products', productsController);
  app.use('/api/v1/orders', ordersController);
  app.use(handleError);
};
