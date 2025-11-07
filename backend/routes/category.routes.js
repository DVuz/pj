const express = require('express');
const db = require('../config/db.config');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middlware');
const { createCategory } = require('../controller/category/createCategory.controller');
const upload = require('../config/multer');

const getCategory = require('../controller/category/getCategory.controller');
const getDetailCategoryWithID = require('../controller/category/getDetailCategoryWithID.controller');



router.post(
  '/create',
  authMiddleware(),
  upload.fields([{ name: 'categoryImage', maxCount: 1 }]),
  createCategory
);
router.get('/', getCategory);
router.get('/:category_id', getDetailCategoryWithID);

module.exports = router;
