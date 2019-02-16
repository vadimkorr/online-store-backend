const express = require('express');
const withErrorHandling = require('@middleware').withErrorHandling;
const router = express.Router();
const ordersService = require('@orders').ordersService;
const auth = require('@middleware').auth;
const rolesConsts = require('@consts').roles;

// get orders
router.get(
  '/',
  withErrorHandling((req, res) => {
    let start = req.query.start || 1;
    let count = req.query.count || 10;
    var items = ordersService.getOrders(start, count).map(o => ({
      id: o['$loki'],
      createdAt: o.createdAt,
      status: o.status,
      items: o.items
    }));
    const totalItems = ordersService.getOrdersCount();
    res.json({items, totalItems});
  })
);

// get order
router.get(
  '/:id',
  withErrorHandling((req, res) => {
    let id = req.params.id;
    var item = ordersService.getOrder(id);
    res.json({
      id: item['$loki'],
      status: item.status,
      items: item.items
    });
  })
);

// create order with user id
router.post(
  '/',
  withErrorHandling((req, res) => {
    ordersService.addOrder({
      userId: 'userId',
      items: req.body.items,
      status: 'created',
      createdAt: Date.now()
    });
    res.json({});
  })
);

// change status
router.post(
  '/:id',
  auth.withAuth(),
  auth.withRole(rolesConsts.ADMIN),
  withErrorHandling((req, res) => {
    const result = ordersService.updateOrderStatus(
      req.params.id,
      req.body.status
    );
    if (result instanceof Error) {
      res.status(404).json({ error: result.message });
    } else {
      res.sendStatus(200);
    }
  })
);

module.exports = router;
