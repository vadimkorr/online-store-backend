const _dbService = require('@shared-services/db');
const _consts = require('@shared-consts');

function getProductById(id) {
  return _dbService.getById(_consts.collectionNames.PRODUCTS_COLL_NAME, id);
}

function getProducts(start, count) {
  return _dbService.getRange(
    _consts.collectionNames.PRODUCTS_COLL_NAME,
    start,
    count
  );
}

module.exports = {
  getProductById: getProductById,
  getProducts: getProducts
};
