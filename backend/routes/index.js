const express = require('express');
const router = express.Router();
const test = require('./test');
const auth = require('./auth');
const category = require('./category.routes');
const subcategory = require('./subcategory.routes');
const producttype = require('./producttype.routes');

router.use('/producttype', producttype);

router.use('/subcategory', subcategory);

router.use('/category', category);

router.use('/test', test);

router.use('/auth', auth);

module.exports = router;
