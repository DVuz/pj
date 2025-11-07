const express = require('express');
const router = express.Router();
const getSubcategory  = require('../controller/subcategories/getSubCategory.controller');
const {createSubCategory} = require('../controller/subcategories/createSubCategory.controller');
const authMiddleware = require('../middlewares/auth.middlware');
const upload = require('../config/multer');

const getDetailCategoryWithID = require('../controller/subcategories/getDetailSubcategoryWithID');

router.post('/create',
	// authMiddleware(),
	upload.fields([{name: 'subcategoryImage', maxCount: 1}]),
	createSubCategory
);

router.get('/:subcategory_id', getDetailCategoryWithID);

router.get('/', getSubcategory);

module.exports = router;
