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

function removeOrder(id) {
  let orderToUpdate = ordersDal.getOrderById(id);
  return ordersDal.updateOrder({
    ...orderToUpdate,
    status: 'removed'
  });
}

function updateOrderStatus(id, status) {
  let orderToUpdate = ordersDal.getOrderById(id);
  return ordersDal.updateOrder({
    ...orderToUpdate,
    status: status
  });
}

module.exports = {
  getOrders: getOrders,
  getOrder: getOrder,
  addOrder: addOrder,
  removeOrder: removeOrder,
  updateOrderStatus: updateOrderStatus
};
