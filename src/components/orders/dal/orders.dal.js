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
  return dbService.getById(_consts.collectionNames.ORDERS_COLL_NAME, id);
}

function addOrder(order) {
  dbService.insert(_consts.collectionNames.ORDERS_COLL_NAME, order);
}

function updateOrderStatus(orderId, status) {
  let order = dbService.getById(_consts.collectionNames.ORDERS_COLL_NAME, id);
  order.status = status;
  dbService.update(_consts.collectionNames.ORDERS_COLL_NAME, orderId, order);
}

module.exports = {
  getOrders: getOrders,
  getOrderById: getOrderById,
  addOrder: addOrder,
  updateOrderStatus: updateOrderStatus
};
