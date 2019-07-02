const dbService = require('@services/db');
const consts = require('@consts');
const productsDal = require('@products/dal/products.dal');
const pathService = require('@services').pathService;

function getOrders(start, count) {
  return dbService
    .getRange(consts.collectionNames.ORDERS_COLL_NAME, start, count)
    .map(item => {
      let items = item.items.map(ei => {
        let product = productsDal.getProductById(ei.id);
        return {
          product: {
            id: product['$loki'],
            img: pathService.getImageUrl(product.img),
            name: product.name,
            price: product.price
          },
          count: ei.count
        };
      });
      let extendedItem = {
        ...item,
        items: items
      };
      return extendedItem;
    });
}

function getOrdersByUserId(userId, start, count) {
  return dbService
    .getRangeBy(
      consts.collectionNames.ORDERS_COLL_NAME,
      'userId',
      userId,
      start,
      count
    )
    .map(item => {
      let items = item.items.map(ei => {
        let product = productsDal.getProductById(ei.id);
        return {
          product: {
            id: product['$loki'],
            img: pathService.getImageUrl(product.img),
            name: product.name,
            price: product.price
          },
          count: ei.count
        };
      });
      let extendedItem = {
        ...item,
        items: items
      };
      return extendedItem;
    });
}

function getOrdersCount() {
  return dbService.count(consts.collectionNames.ORDERS_COLL_NAME);
}

function getOrderById(id) {
  return dbService.getById(consts.collectionNames.ORDERS_COLL_NAME, id);
}

function addOrder(order) {
  let items = order.items.map(oi => {
    let orderItem = productsDal.getProductById(oi.productId);
    return {
      id: orderItem['$loki'],
      count: oi.count,
      price: orderItem.price
    };
  });
  let extendedOrder = {
    status: order.status,
    userId: order.userId,
    createdAt: order.createdAt,
    items
  };
  dbService.insert(consts.collectionNames.ORDERS_COLL_NAME, extendedOrder);
}

function updateOrder(order) {
  dbService.update(consts.collectionNames.ORDERS_COLL_NAME, order);
}

module.exports = {
  getOrders: getOrders,
  getOrderById: getOrderById,
  addOrder: addOrder,
  updateOrder: updateOrder,
  getOrdersCount: getOrdersCount,
  getOrdersByUserId: getOrdersByUserId
};
