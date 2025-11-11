const { successResponse, errorResponse } = require('../../utils/response');
const db = require('../../config/db.config');
const validateImages = require('../../utils/validateImage');
const uploadToCloudinary = require('../../utils/cloudinary/uploadToCloudinary');
const deleteFromCloudinary = require('../../utils/cloudinary/deleteFromCloudinary');
const CLOUDINARY_FOLDERS = require('../../config/folderStucture');
const camelObjToSnakeObj = require('../../utils/camelToSnake');

const createProduct = async (req, res) => {
  let createMainImageUrl = '';
  let createSubImageUrls = [];

  try {
    const validateImageResult = validateImages(req.files);
    if (!validateImageResult.valid) {
      return errorResponse(res, {}, 400, validateImageResult.message);
    }

    const snakeBody = camelObjToSnakeObj(req.body);

    const checkProductCodeExited = 'SELECT * FROM products WHERE product_code = ?';
    const productCodeExited = await db.query(checkProductCodeExited, [snakeBody.product_code]);
    if (productCodeExited[0].length > 0) {
      return errorResponse(res, {}, 400, 'Mã sản phẩm đã tồn tại');
    }
    const checkProductTypeIIdNotExited = 'SELECT * FROM producttypes WHERE product_type_id = ?';
    const productTypeIdNotExited = await db.query(checkProductTypeIIdNotExited, [
      snakeBody.product_type_id,
    ]);
    if (productTypeIdNotExited[0].length === 0) {
      return errorResponse(res, {}, 400, 'Loại sản phẩm không tồn tại');
    }

    if (req.files && req.files['mainImage']) {
      createMainImageUrl = await uploadToCloudinary(
        req.files['mainImage'][0].buffer,
        CLOUDINARY_FOLDERS.PRODUCT
      );
    }

    if (req.files && req.files['subImages']) {
      for (const file of req.files['subImages']) {
        const subImageUrl = await uploadToCloudinary(file.buffer, CLOUDINARY_FOLDERS.PRODUCT);
        createSubImageUrls.push(subImageUrl);
      }
    }

    const insertProductQuery = `
        INSERT INTO products (
            product_code,
            product_name_vn,
            main_image,
            sub_image,
            length,
            width,
            height,
            material_vn,
            description_vn,
            origin_vn,
            color_vn,
            product_type_id,
            status,
            warranty_period,
            price,
            created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
		`;

    await db.query(insertProductQuery, [
      snakeBody.product_code,
      snakeBody.product_name_vn,
      createMainImageUrl,
      JSON.stringify(createSubImageUrls),
      snakeBody.length,
      snakeBody.width,
      snakeBody.height,
      snakeBody.material_vn,
      snakeBody.description_vn,
      snakeBody.origin_vn,
      snakeBody.color_vn,
      snakeBody.product_type_id,
      snakeBody.status,
      snakeBody.warranty_period,
      snakeBody.price,
      new Date(),
    ]);

    return successResponse(res, {}, 201, 'Tạo sản phẩm thành công');
  } catch (error) {
    console.error('Lỗi khi tạo sản phẩm:', error);

    // Rollback: xóa các ảnh đã upload
    if (createMainImageUrl) {
      await deleteFromCloudinary(createMainImageUrl);
    }
    for (const url of createSubImageUrls) {
      await deleteFromCloudinary(url);
    }

    return errorResponse(res, {}, 500, 'Lỗi server');
  }
};

module.exports =  createProduct ;
