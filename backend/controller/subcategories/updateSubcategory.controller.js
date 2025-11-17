const { successResponse, errorResponse } = require('../../utils/response');
const db = require('../../config/db.config');
const uploadToCloudinary = require('../../utils/cloudinary/uploadToCloudinary');
const deleteFromCloudinary = require('../../utils/cloudinary/deleteFromCloudinary');
const CLOUDINARY_FOLDERS = require('../../config/folderStucture');
const camelObjToSnakeObj = require('../../utils/camelToSnake');
const {deleteCachePattern} = require('../../utils/cache/redis');


const updateSubcategory = async (req, res) => {
	let newImageUrl = '';
	let deletedImages = [];
	try {
		const {subcategory_id} = req.params;
		const snakeBody = camelObjToSnakeObj(req.body);

		// Kiểm tra subcategory tồn tại
		const checkSubcategoryQuery = 'SELECT * FROM subcategories WHERE subcategory_id = ?';
		const [subcategoryRows] = await db.query(checkSubcategoryQuery, [subcategory_id]);
		if (subcategoryRows.length === 0) {
			return errorResponse(res, {}, 404, 'Danh mục con không tồn tại');
		}
		const currentSubcategory = subcategoryRows[0];

		// check category_id tồn tại
		if (snakeBody.category_id && snakeBody.category_id !== currentSubcategory.category_id) {
			const checkCategoryQuery = 'SELECT * FROM categories WHERE category_id = ?';
			const [categoryRows] = await db.query(checkCategoryQuery, [snakeBody.category_id]);
			if (categoryRows.length === 0) {
				return errorResponse(res, {}, 404, 'Danh mục không tồn tại');
			}
		}

		// Kiểm tra trùng tên
		if (
			snakeBody.subcategory_name_vn &&
			snakeBody.subcategory_name_vn !== currentSubcategory.subcategory_name_vn
		) {
			const checkNameQuery =
				'SELECT * FROM subcategories WHERE subcategory_name_vn = ? AND subcategory_id != ?';
			const [nameRows] = await db.query(checkNameQuery, [
				snakeBody.subcategory_name_vn,
				subcategory_id,
			]);
			if (nameRows.length > 0) {
				return errorResponse(res, {}, 400, 'Tên danh mục con đã tồn tại');
			}
		}

		// Xử lý ảnh (chỉ cập nhật nếu có upload mới)
		let imageToUpdate = null;
		if (req.files && req.files['subcategoryImage']) {
			// Upload ảnh mới
			newImageUrl = await uploadToCloudinary(
				req.files['subcategoryImage'][0].buffer,
				CLOUDINARY_FOLDERS.SUBCATEGORY
			);

			// Đánh dấu ảnh cũ để xóa
			if (currentSubcategory.image_url) {
				deletedImages.push(currentSubcategory.image_url);
			}

			imageToUpdate = newImageUrl;
		}

		const updateFields = [];
		const updateValues = [];

		// Các trường cập nhật
		if (snakeBody.subcategory_name_vn) {
			updateFields.push('subcategory_name_vn = ?');
			updateValues.push(snakeBody.subcategory_name_vn);
		}
		if (snakeBody.description_vn !== undefined) {
			updateFields.push('description_vn = ?');
			updateValues.push(snakeBody.description_vn);
		}
		if (snakeBody.status) {
			updateFields.push('status = ?');
			updateValues.push(snakeBody.status);
		}
		if (snakeBody.category_id) {
			updateFields.push('category_id = ?');
			updateValues.push(snakeBody.category_id);
		}
		if (imageToUpdate !== null) {
			updateFields.push('image_url = ?');
			updateValues.push(imageToUpdate);
		}

		if (updateFields.length === 0) {
			return errorResponse(res, {}, 400, 'No fields to update');
		}
		updateFields.push('updated_at = ?');
		updateValues.push(new Date());

		updateValues.push(subcategory_id);

		const updateQuery = `UPDATE subcategories SET ${updateFields.join(
			', '
		)} WHERE subcategory_id = ?`;
		await db.query(updateQuery, updateValues);

		// Xóa ảnh cũ trên Cloudinary
		for (const imgUrl of deletedImages) {
			await deleteFromCloudinary(imgUrl);
		}
		await deleteCachePattern('subcategories*');

		return successResponse(res, {}, 200, 'Cập nhật danh mục con thành công');

	}catch(error) {
		console.error('Error in updateSubcategory:', error);
		return errorResponse(res, {}, 500, 'Internal server error');
	}
}
module.exports = updateSubcategory;