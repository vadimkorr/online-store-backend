const express = require('express');
const router = express.Router();
const withErrorHandling = require('@middleware').withErrorHandling;
const productsService = require('@products').productsService;
const crypto = require('crypto');
const mime = require('mime');
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

function getImageUrl(host, imageName) {
  return `${host}/products/${imageName}`;
}

// get products
router.get(
  '/',
  withErrorHandling((req, res) => {
    let start = req.query.start || 1;
    let count = req.query.count || 10;
    var products = productsService.getProducts(start, count).map(p => ({
      id: p['$loki'],
      name: p.name,
      price: p.price,
      image: getImageUrl(req.headers.host, p.img)
    }));
    const pages = Math.ceil(productsService.getProductsCount() / count);
    res.json({products, pages });
  })
);

// get product
router.get(
  '/:id',
  withErrorHandling((req, res) => {
    let id = req.params.id;
    var prod = productsService.getProduct(id);
    res.json({
      name: prod.name,
      image: getImageUrl(req.headers.host, prod.img)
    });
  })
);

// add product
router.post(
  '/',
  upload.single('image'),
  withErrorHandling((req, res) => {
    productsService.addProduct({
      name: req.body.name,
      price: req.body.price,
      img: req.file.filename
    });
    res.json({});
  })
);

// update product
router.post(
  '/:id',
  upload.single('image'),
  withErrorHandling((req, res) => {
    productsService.updateProduct({
      id: req.params.id,
      name: req.body.name,
      price: req.body.price,
      img: req.file ? req.file.filename : undefined
    });
    res.json({});
  })
);

// remove product
router.delete(
  '/:id',
  withErrorHandling((req, res) => {
    productsService.removeProduct(req.params.id);
    res.json({});
  })
);

module.exports = router;
