const express = require('express');
const router = express.Router();
const withErrorHandling = require('@middleware').withErrorHandling;
const productsService = require('@products').productsService;
const pathService = require('@services').pathService;
const crypto = require('crypto');
const mime = require('mime');
const multer = require('multer');
const auth = require('@middleware').auth;
const rolesConsts = require('@consts').roles;

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

// get products
router.get(
  '/',
  auth.withAuth(),
  withErrorHandling((req, res) => {
    let start = req.query.start || 1;
    let count = req.query.count || 10;
    var products = productsService.getProducts(start, count).map(p => ({
      id: p['$loki'],
      name: p.name,
      price: p.price,
      image: pathService.getImageUrl(p.img)
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
      id: id,
      price: prod.price,
      name: prod.name,
      image: pathService.getImageUrl(prod.img)
    });
  })
);

// add product
router.post(
  '/',
  auth.withAuth(),
  auth.withRole(rolesConsts.ADMIN),
  upload.single('image'),
  withErrorHandling((req, res) => {
    productsService.addProduct({
      name: req.body.name,
      price: parseFloat(req.body.price),
      img: req.file.filename
    });
    res.json({});
  })
);

// update product
router.post(
  '/:id',
  auth.withAuth(),
  auth.withRole(rolesConsts.ADMIN),
  upload.single('image'),
  withErrorHandling((req, res) => {
    if (req.file) {
      productsService.updateProductWithImage({
        id: req.params.id,
        name: req.body.name,
        price: parseFloat(req.body.price),
        img: req.file.filename
      });
    } else {
      productsService.updateProduct({
        id: req.params.id,
        name: req.body.name,
        price: parseFloat(req.body.price)
      });
    }
    res.json({});
  })
);

// remove product
router.delete(
  '/:id',
  auth.withAuth(),
  auth.withRole(rolesConsts.ADMIN),
  withErrorHandling((req, res) => {
    productsService.removeProduct(req.params.id);
    res.json({});
  })
);

module.exports = router;
