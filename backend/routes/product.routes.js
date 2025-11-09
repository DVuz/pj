const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middlware');
const upload = require('../config/multer');
const { createProduct } = require('../controller/product/createProduct.controller');

router.post(
  '/',
  authMiddleware('Admin'),
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImage', maxCount: 10 },
  ]),
  createProduct
);
module.exports = router;
