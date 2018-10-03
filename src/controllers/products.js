const productsService = require('@products/services/products.service');

function getProducts(req, res) {
  let start = req.query.start || 1;
  let count = req.query.count || 10;
  var products = productsService.getProducts(start, count);
  res.json({
    value: products
  });
}

function getProduct(req, res) {
  let id = req.params.id;
  var prod = productsService.getProduct(id);
  res.json({
    value: prod
  });
}

module.exports = {
  getProducts: getProducts,
  getProduct: getProduct
};
