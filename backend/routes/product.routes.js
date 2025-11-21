const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middlware');
const upload = require('../config/multer');

const createProduct = require('../controller/product/createProduct.controller');
const getProduct = require('../controller/product/getProduct.controller');
const getDetailProductById = require('../controller/product/getDetailProductById.controller');
const updateProduct = require('../controller/product/updateProduct.controller');
const deleteProductById = require('../controller/product/deleteProductById.controller');

router.get('/', getProduct);
router.get('/:product_id', getDetailProductById);

router.post(
  '/',
  authMiddleware('Admin'),
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImage', maxCount: 10 },
  ]),
  createProduct
);

// Update a product by ID
router.put(
  '/:product_id',
  authMiddleware('Admin'),
  upload.fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'sub_images', maxCount: 10 },
  ]),
  updateProduct
);

// Delete a product by ID
router.delete('/:product_id', authMiddleware('Admin'), deleteProductById);

module.exports = router;
