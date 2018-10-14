const express = require('express');
const router = express.Router();
const ordersService = require('@orders').ordersService;

// get orders
router.get('/', (req, res) => {
  let start = req.query.start || 1;
  let count = req.query.count || 10;
  var items = ordersService.getOrders(start, count).map(o => ({
    id: o['$loki'],
    status: o.status,
    items: o.items
  }));
  res.json(items);
});

// get order
router.get('/:id', (req, res) => {
  let id = req.params.id;
  var item = ordersService.getOrder(id);
  res.json({
    id: item['$loki'],
    status: item.status,
    items: item.items
  });
});

// create order with user id
router.post('/', (req, res) => {
  ordersService.addOrder({
    userId: 'userId',
    items: req.body.items,
    status: req.body.status
  });
  res.json({});
});

// change status
router.post('/:id', (req, res) => {
  console.log('BODY', req.body);
  ordersService.updateOrderStatus(req.params.id, req.body.status);
  res.json({});
});

module.exports = router;
