const express = require('express');
const withErrorHandling = require('@middleware').withErrorHandling;
const router = express.Router();
const ordersService = require('@orders').ordersService;
const auth = require('@middleware').auth;
const rolesConsts = require('@consts').roles;
const statusesConsts = require('@consts').statuses;

// get orders
router.get(
  '/all',
  auth.withAuth(),
  auth.withRole(rolesConsts.ADMIN),
  withErrorHandling((req, res) => {
    let start = req.query.start || 1;
    let count = req.query.count || 10;
    var items = ordersService.getOrders(start, count).map(o => ({
      id: o['$loki'],
      userId: o.userId,
      createdAt: o.createdAt,
      status: o.status,
      items: o.items
    }));
    const totalItemsCount = ordersService.getOrdersCount();
    res.json({ items, totalItemsCount });
  })
);

// get orders of user
router.get(
  '/',
  auth.withAuth(),
  auth.withRole(rolesConsts.USER),
  withErrorHandling((req, res) => {
    const user = req.user;
    let start = req.query.start || 1;
    let count = req.query.count || 10;
    var items = ordersService
      .getOrdersByUserId(user.id, start, count)
      .map(o => ({
        id: o['$loki'],
        createdAt: o.createdAt,
        status: o.status,
        items: o.items
      }));
    const totalItemsCount = ordersService.getOrdersCount();
    res.json({ items, totalItemsCount });
  })
);

// get order
router.get(
  '/:id',
  auth.withAuth(),
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
  auth.withAuth(),
  auth.withRole(rolesConsts.USER),
  withErrorHandling((req, res) => {
    const user = req.user;
    ordersService.addOrder({
      userId: user.id,
      items: req.body.items,
      status: statusesConsts['Created'],
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
      res.json({});
    }
  })
);

module.exports = router;
