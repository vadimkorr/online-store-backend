const _productsDal = require('@products/dal/products.dal');

function getProducts(start, count) {
  return _productsDal.getProducts(start, count);
}

function getProduct(id) {
  return _productsDal.getProductById(id);
}

module.exports = {
  getProducts: getProducts,
  getProduct: getProduct
};
