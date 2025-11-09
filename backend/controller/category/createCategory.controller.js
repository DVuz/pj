const { successResponse, errorResponse } = require('../../utils/response');
const db = require('../../config/db.config');
const validateImages = require('../../utils/validateImage');
const uploadToCloudinary = require('../../utils/cloudinary/uploadToCloudinary');
const CLOUDINARY_FOLDERS = require('../../config/folderStucture');
const camelObjToSnakeObj = require('../../utils/camelToSnake');

const createCategory = async (req, res) => {
  try {
    const validateImageResult = validateImages(req.files);
    if (!validateImageResult.valid) {
      return errorResponse(res, {}, 400, validateImageResult.message);
    }

    let createCategoryImageUrl = '';
    const snakeBody = camelObjToSnakeObj(req.body);
    console.log(snakeBody)

    const checkCategoryExisted = 'Select * from categories where category_name_vn = ?';
    const categoryExisted = await db.query(checkCategoryExisted, [snakeBody.category_name_vn]);
    if (categoryExisted[0].length > 0) {
      return errorResponse(res, {}, 400, 'Danh mục đã tồn tại');
    }

    if (req.files && req.files['categoryImage']) {
      createCategoryImageUrl = await uploadToCloudinary(
        req.files['categoryImage'][0].buffer,
        CLOUDINARY_FOLDERS.CATEGORY
      );
    }
    const insertCategoryQuery = `
      INSERT INTO categories (category_name_vn, description_vn, status, image_url, created_at)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.query(insertCategoryQuery, [
      snakeBody.category_name_vn,
      snakeBody.description_vn,
      snakeBody.status,
      createCategoryImageUrl,
      new Date(),
    ]);

    return successResponse(res, {}, 201, 'Tạo danh mục thành công');
  } catch (error) {
    console.error('Error creating category:', error);
    return errorResponse(res, {}, 500, 'Lỗi server');
  }
};
module.exports = { createCategory };
