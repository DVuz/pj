const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middlware');
const upload = require('../config/multer');
const  createProduct  = require('../controller/product/createProduct.controller');
const getProduct = require('../controller/product/getProduct.controller');
const getDetailProductById = require('../controller/product/getDetailProductById.controller');
const updateProduct = require('../controller/product/updateProduct.controller');
const deleteProductById = require('../controller/product/deleteProductById.controller');

router.delete('/:product_id',
  authMiddleware('Admin'),
  deleteProductById);

router.get('/:product_id', getDetailProductById);
router.put(
  '/:product_id',
  // authMiddleware(),
  upload.fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'sub_images', maxCount: 10 },
  ]),
  updateProduct
);
router.get('/', getProduct);

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
