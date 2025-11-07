const express = require('express');
const router = express.Router();
const {createProductType} = require('../controller/productype/createProductType.controller');
const getProductType = require('../controller/productype/getProductType.controller');
const authMiddleware = require('../middlewares/auth.middlware');
const upload = require('../config/multer');
const getDetailProductTypeWithID = require('../controller/productype/getDetailProductTypeWithID');

router.get('/:product_type_id', getDetailProductTypeWithID);

router.post('/create',
	// authMiddleware(),
	upload.fields([{name: 'productTypeImage', maxCount: 1}]),
	createProductType)
router.get('/', getProductType);

module.exports = router;
