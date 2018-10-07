const express = require('express');
const router = express.Router();
const productsService = require('@products/services/products.service');

function getImageUrl(host, imageName) {
  return `${host}/products/${imageName}`;
}

/**
 * @route GET /products
 * @group products - Operations about products
 * @param {string} start.query - start from
 * @param {string} count.query - number of results
 * @returns {object} 200 - An array of product info
 * @returns {Error}  default - Unexpected error
 */
router.get('/', (req, res) => {
  let start = req.query.start || 1;
  let count = req.query.count || 10;
  var products = productsService.getProducts(start, count).map(p => ({
    id: p['$loki'],
    name: p.name,
    price: p.price,
    image: getImageUrl(req.headers.host, p.img)
  }));
  res.json(products);
});

/**
 * @route GET /products/:id
 * @group products - Operations about products
 * @returns {object} 200 - An array of product info
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', (req, res) => {
  let id = req.params.id;
  var prod = productsService.getProduct(id);
  res.json({
    name: prod.name,
    image: getImageUrl(req.headers.host, prod.img)
  });
});

module.exports = router;
