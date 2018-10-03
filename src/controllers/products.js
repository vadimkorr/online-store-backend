const productsService = require('@products/services/products.service');

/**
 * @route GET /products
 * @group products - Operations about products
 * @param {string} start.query - start from
 * @param {string} count.query - number of results
 * @returns {object} 200 - An array of product info
 * @returns {Error}  default - Unexpected error
 */
function getProducts(req, res) {
  let start = req.query.start || 1;
  let count = req.query.count || 10;
  var products = productsService.getProducts(start, count);
  res.json({
    value: products
  });
}

/**
 * @route GET /products/:id
 * @group products - Operations about products
 * @returns {object} 200 - An array of product info
 * @returns {Error}  default - Unexpected error
 */
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
