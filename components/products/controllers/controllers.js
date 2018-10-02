const productsService = require('../services').productsService;

function getProducts(req, res) {
  let start = req.query.start || 1;
  let count = req.query.count || 10;

  console.log(req.query, productsService.getProducts(start, count));
  res.json({
    value: 'Get Products'
  });
}

function getProduct(req, res) {
  let id = req.params.id;
  console.log(req.params, productsService.getProduct(id));
  res.json({
    value: 'Hello'
  });
}

module.exports = {
  getProducts: getProducts,
  getProduct: getProduct
};
