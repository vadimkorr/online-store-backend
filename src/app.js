const express = require('express');
const crypto = require('crypto');
const mime = require('mime');

const _dbService = require('./shared/services/db');
const _consts = require('./shared/consts');
const _productsController = require('@controllers').products;

const multer = require('multer');

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
const fileFilter = (req, file, cb) => {
  file.mimetype === 'image/jpeg' ? cb(null, true) : cb(null, false);
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // bytes, 2MB
    files: 1
  },
  fileFilter: fileFilter
});

const app = express();

_dbService.initDb(_consts.server.DB_PATH);

// app.use(bodyParser.json());
app.use('/products', express.static('products'));

/* Products API */
app.get('/api/v1/products', _productsController.getProducts);
app.get('/api/v1/products/:id', _productsController.getProduct);
app.post(
  '/api/v1/products',
  upload.single('image'),
  _productsController.addProduct
);

module.exports = app;
