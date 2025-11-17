const express = require('express');
const router = express.Router();
const getSubcategory  = require('../controller/subcategories/getSubCategory.controller');
const {createSubCategory} = require('../controller/subcategories/createSubCategory.controller');
const authMiddleware = require('../middlewares/auth.middlware');
const upload = require('../config/multer');
const deleteSubcategoryById = require('../controller/subcategories/deleteSubcategoryById.controller');
const getDetailCategoryWithID = require('../controller/subcategories/getDetailSubcategoryWithID');
const updateSubcategory = require('../controller/subcategories/updateSubcategory.controller');

router.put('/:subcategory_id',
	authMiddleware("Admin"),
	upload.fields([{name: 'subcategoryImage', maxCount: 1}]),
	updateSubcategory
);

router.delete('/:subcategory_id',
	authMiddleware("Admin"),
	deleteSubcategoryById
);

router.post('/create',
	authMiddleware("Admin"),
	upload.fields([{name: 'subcategoryImage', maxCount: 1}]),
	createSubCategory
);

router.get('/:subcategory_id', getDetailCategoryWithID);

router.get('/', getSubcategory);

module.exports = router;
