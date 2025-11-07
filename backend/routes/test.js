const express = require('express');
const db = require('../config/db.config');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middlware');
const { uploadFile } = require('../controller/uploadFileTest');
const upload = require('../config/multer');

const getCategory = require('../controller/category/test/getCategory.controller');

router.get('/', authMiddleware(), (req, res) => {
  res.json({ message: 'This is a test route.' });
});
router.post(
  '/upload',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 3 },
  ]),
  uploadFile
);
router.get('/categories', getCategory);

module.exports = router;
