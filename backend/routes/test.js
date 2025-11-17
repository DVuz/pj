const express = require('express');
const db = require('../config/db.config');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middlware');
const { uploadFile } = require('../controller/uploadFileTest');
const upload = require('../config/multer');

router.get('/test', (req, res) => {
  return res.json({ message: 'Test route is working!' });
});

module.exports = router;
