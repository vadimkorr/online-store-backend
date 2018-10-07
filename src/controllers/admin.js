const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const mime = require('mime');
const multer = require('multer');
const productsService = require('@products/services/products.service');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './products/');
  },
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return cb(err);
      cb(null, `${raw.toString('hex')}.${mime.getExtension(file.mimetype)}`);
    });
  }
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // bytes, 2MB
    files: 1
  },
  fileFilter: (req, file, cb) => {
    file.mimetype === 'image/jpeg' ? cb(null, true) : cb(null, false);
  }
});

/**
 * @route POST /admin/products
 * @group admin - Admin's operations
 * @param {string} name.body.required - name of the product
 * @param {number} price.body.required - price of the product
 * @returns {object} 200 - Product saved
 * @returns {Error}  default - Unexpected error
 */
router.post('/products', upload.single('image'), (req, res) => {
  productsService.addProduct({
    name: req.body.name,
    price: req.body.price,
    img: req.file.filename
  });
  res.json({});
});

/**
 * @route POST /admin/products/:id
 * @group admin - Admin's operations
 * @param {string} name.body.required - name of the product
 * @param {number} price.body.required - price of the product
 * @returns {object} 200 - Product saved
 * @returns {Error}  default - Unexpected error
 */
router.post('/products/:id', upload.single('image'), (req, res) => {
  productsService.updateProduct({
    id: req.params.id,
    name: req.body.name,
    price: req.body.price,
    img: req.file ? req.file.filename : undefined
  });
  res.json({});
});

module.exports = router;
