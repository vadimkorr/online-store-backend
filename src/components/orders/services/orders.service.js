const ordersDal = require('@orders/dal/orders.dal');

function getOrders(start, count) {
  return ordersDal.getOrders(start, count);
}

function getOrder(id) {
  return ordersDal.getOrderById(id);
}

function addOrder(order) {
  return ordersDal.addOrder(order);
}

function removeOrder(orderId) {
  return ordersDal.updateOrderStatus(orderId, 'removed');
}

function updateOrderStatus(orderId, status) {
  return ordersDal.updateOrderStatus(orderId, status);
}

module.exports = {
  getOrders: getOrders,
  getOrder: getOrder,
  addOrder: addOrder,
  removeOrder: removeOrder,
  updateOrderStatus: updateOrderStatus
};
