const express = require('express');
const app = express();

const productsControllers = require('./components/products').controllers;

// app.use(bodyParser.json());

/* Products API */
app.get('/api/products', productsControllers.getProducts);
app.get('/api/products/:id', productsControllers.getProduct);

module.exports = app;
