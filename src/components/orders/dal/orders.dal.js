const dbService = require('@shared-services/db');
const consts = require('@shared-consts');

function getOrders(start, count) {
  return dbService.getRange(
    consts.collectionNames.ORDERS_COLL_NAME,
    start,
    count
  );
}

function getOrderById(id) {
  return dbService.getById(consts.collectionNames.ORDERS_COLL_NAME, id);
}

function addOrder(order) {
  dbService.insert(consts.collectionNames.ORDERS_COLL_NAME, order);
}

function updateOrder(order) {
  dbService.update(consts.collectionNames.ORDERS_COLL_NAME, order);
}

module.exports = {
  getOrders: getOrders,
  getOrderById: getOrderById,
  addOrder: addOrder,
  updateOrder: updateOrder
};
