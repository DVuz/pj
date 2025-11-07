const {successResponse, errorResponse} = require('../../utils/response');
const db = require('../../config/db.config');
const validateImages = require('../../utils/validateImage');
const uploadToCloudinary = require('../../utils/uploadToCloudinary');
const CLOUDINARY_FOLDERS = require('../../config/folderStucture');
const camelObjToSnakeObj = require('../../utils/camelToSnake');

const createProductType = async (req, res) => {
	try {
    // Validate image files
    const validateImageResult = validateImages(req.files);
    if (!validateImageResult.valid) {
      return errorResponse(res, {}, 400, validateImageResult.message);
    }

    // Convert request body keys to snake_case
    const snakeBody = camelObjToSnakeObj(req.body);
    console.log(snakeBody);

    // Validate required fields
    const requiredFields = ['subcategory_id', 'productType_name_vn', 'description_vn', 'status'];
    for (const field of requiredFields) {
      if (!snakeBody[field]) {
        return errorResponse(res, {}, 400, `Missing required field: ${field}`);
      }
    }
		let createProductTypeImageUrl = '';
    // Check if product type already exists
    const checkProductTypeExisted = 'SELECT * FROM producttypes WHERE productType_name_vn = ?';
    const [productTypeExisted] = await db.query(checkProductTypeExisted, [
      snakeBody.productType_name_vn,
    ]);
    if (productTypeExisted.length > 0) {
      return errorResponse(res, {}, 400, 'Loại sản phẩm đã tồn tại');
    }
		if (req.files && req.files['productTypeImage']) {
			console.log("Uploading image to Cloudinary...");
      createProductTypeImageUrl = await uploadToCloudinary(
        req.files['productTypeImage'][0].buffer,
        CLOUDINARY_FOLDERS.PRODUCTTYPE
      );
    }else{
			console.log("No image file provided for product type.");
			return errorResponse(res, {}, 400, 'Vui lòng cung cấp hình ảnh cho loại sản phẩm');
		}


    // Insert new product type
    const insertProductTypeQuery = `
        INSERT INTO producttypes (subcategory_id, product_type_name_vn, description_vn, status, image_url, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
		`;
    await db.query(insertProductTypeQuery, [
      snakeBody.subcategory_id,
      snakeBody.productType_name_vn,
      snakeBody.description_vn,
      snakeBody.status,
      createProductTypeImageUrl,
      new Date(),
    ]);

    return successResponse(res, {}, 201, 'Tạo loại sản phẩm thành công');
  } catch (error) {
		console.error('Error creating product type:', error);
		return errorResponse(res, {}, 500, 'Lỗi server');
	}
};

module.exports = {createProductType};
