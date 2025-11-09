const express = require('express');
const router = express.Router();
const test = require('./test');
const auth = require('./auth');
const category = require('./category.routes');
const subcategory = require('./subcategory.routes');
const productType = require('./producttype.routes');
const product = require('./product.routes');

router.use('/products', product);

router.use('/productTypes', productType);

router.use('/subcategories', subcategory);

router.use('/categories', category);

router.use('/test', test);

router.use('/auth', auth);

module.exports = router;
