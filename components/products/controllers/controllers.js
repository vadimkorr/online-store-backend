const productsServices = require('../services');

function getProducts(req, res) {
  console.log(productsServices.productsService.getProducts());
  res.json({
    value: 'Get Products'
  });
}

function getProduct(req, res) {
  res.json({
    value: 'Hello'
  });
}

module.exports = {
  getProducts: getProducts,
  getProduct: getProduct
};
