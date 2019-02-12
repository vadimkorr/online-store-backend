const ordersDal = require('@orders/dal/orders.dal');

function getOrders(start, count) {
  return ordersDal.getOrders(start, count);
}

function getOrdersCount() {
  return ordersDal.getOrdersCount();
}

function getOrder(id) {
  return ordersDal.getOrderById(id);
}

function addOrder(order) {
  return ordersDal.addOrder(order);
}

function updateOrderStatus(id, status) {
  let orderToUpdate = ordersDal.getOrderById(id);
  if (orderToUpdate) {
    return ordersDal.updateOrder({
      ...orderToUpdate,
      status: status
    });
  } else {
    return new Error('Order not found');
  }
}

module.exports = {
  getOrders: getOrders,
  getOrder: getOrder,
  addOrder: addOrder,
  updateOrderStatus: updateOrderStatus,
  getOrdersCount: getOrdersCount
};
