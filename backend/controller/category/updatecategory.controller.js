const { successResponse, errorResponse } = require('../../utils/response');
const db = require('../../config/db.config');
const uploadToCloudinary = require('../../utils/cloudinary/uploadToCloudinary');
const deleteFromCloudinary = require('../../utils/cloudinary/deleteFromCloudinary');
const CLOUDINARY_FOLDERS = require('../../config/folderStucture');
const camelObjToSnakeObj = require('../../utils/camelToSnake');

const updateCategory = async (req, res) => {
  let newImageUrl = '';
  let deletedImages = [];
  try {
    const { category_id } = req.params;
    const snakeBody = camelObjToSnakeObj(req.body);

    // Kiểm tra category tồn tại
    const checkCategoryQuery = 'SELECT * FROM categories WHERE category_id = ?';
    const [categoryRows] = await db.query(checkCategoryQuery, [category_id]);
    if (categoryRows.length === 0) {
      return errorResponse(res, {}, 404, 'Danh mục không tồn tại');
    }
    const currentCategory = categoryRows[0];

    // Kiểm tra trùng tên
    if (
      snakeBody.category_name_vn &&
      snakeBody.category_name_vn !== currentCategory.category_name_vn
    ) {
      const checkNameQuery =
        'SELECT * FROM categories WHERE category_name_vn = ? AND category_id != ?';
      const [nameRows] = await db.query(checkNameQuery, [snakeBody.category_name_vn, category_id]);
      if (nameRows.length > 0) {
        return errorResponse(res, {}, 400, 'Tên danh mục đã tồn tại');
      }
    }

    // Xử lý ảnh (chỉ cập nhật nếu có upload mới)
    let imageToUpdate = null;
    if (req.files && req.files['categoryImage']) {
      // Upload ảnh mới
      newImageUrl = await uploadToCloudinary(
        req.files['categoryImage'][0].buffer,
        CLOUDINARY_FOLDERS.CATEGORY
      );

      // Đánh dấu ảnh cũ để xóa
      if (currentCategory.image_url) {
        deletedImages.push(currentCategory.image_url);
      }

      imageToUpdate = newImageUrl;
    }

    const updateFields = [];
    const updateValues = [];

    // Các trường cập nhật
    if (snakeBody.category_name_vn) {
      updateFields.push('category_name_vn = ?');
      updateValues.push(snakeBody.category_name_vn);
    }
    if (snakeBody.description_vn !== undefined) {
      updateFields.push('description_vn = ?');
      updateValues.push(snakeBody.description_vn);
    }
    if (snakeBody.status) {
      updateFields.push('status = ?');
      updateValues.push(snakeBody.status);
    }
    // Chỉ cập nhật image_url nếu có ảnh mới
    if (imageToUpdate) {
      updateFields.push('image_url = ?');
      updateValues.push(imageToUpdate);
    }
    updateFields.push('updated_at = ?');
    updateValues.push(new Date());

    updateValues.push(category_id);

    const updateCategoryQuery = `
      UPDATE categories SET ${updateFields.join(', ')} WHERE category_id = ?`;
    await db.query(updateCategoryQuery, updateValues);

    // Xóa ảnh cũ khỏi Cloudinary nếu có
    for (const imageUrl of deletedImages) {
      await deleteFromCloudinary(imageUrl);
    }

    return successResponse(res, {}, 200, 'Category updated successfully');
  } catch (error) {
    console.error('Error updating category:', error);
    return errorResponse(res, {}, 500, 'Lỗi server khi cập nhật danh mục');
  }
};

module.exports = updateCategory;
