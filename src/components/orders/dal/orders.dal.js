const dbService = require('@shared-services/db');
const consts = require('@shared-consts');
const productsDal = require('@products/dal/products.dal');

function getOrders(start, count) {
  return dbService.getRange(
    consts.collectionNames.ORDERS_COLL_NAME,
    start,
    count
  ).map(item => {
    let items = item.items.map(ei => {
      let product = productsDal.getProductById(ei.id);
      return ({
        product: {
          id: product['$loki'],
          img: product.img,
          name: product.name,
          price: product.price
        },
        count: ei.count
      });
    });
    let extendedItem = {
      ...item,
      items: items
    }
    console.log(extendedItem);
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
    let orderItem = productsDal.getProductById(oi.id);
    return ({
      ...oi,
      price: orderItem.price
    });
  });
  let extendedOrder = {
    ...order,
    items
  }
  console.log(extendedOrder);

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
  getOrdersCount: getOrdersCount
};
