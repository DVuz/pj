const { successResponse, errorResponse } = require('../../utils/response');
const db = require('../../config/db.config');
const uploadToCloudinary = require('../../utils/cloudinary/uploadToCloudinary');
const deleteFromCloudinary = require('../../utils/cloudinary/deleteFromCloudinary');
const CLOUDINARY_FOLDERS = require('../../config/folderStucture');
const camelObjToSnakeObj = require('../../utils/camelToSnake');
const {deleteCachePattern} = require('../../utils/cache/redis');


const updateProductTypeById = async (req, res) => {
	let newImageUrl = '';
	let deletedImages = [];
	try {
		const {product_type_id} = req.params;
		const snakeBody = camelObjToSnakeObj(req.body);

		// Kiểm tra product type tồn tại
		const checkProductTypeQuery = 'SELECT * FROM producttypes WHERE product_type_id = ?';
		const [productTypeRows] = await db.query(checkProductTypeQuery, [product_type_id]);
		if (productTypeRows.length === 0) {
			return errorResponse(res, {}, 404, 'Loại sản phẩm không tồn tại');
		}
		const currentProductType = productTypeRows[0];

		// check subcategory_id tồn tại
		if (snakeBody.subcategory_id && snakeBody.subcategory_id !== currentProductType.subcategory_id) {
			const checkSubcategoryQuery = 'SELECT * FROM subcategories WHERE subcategory_id = ?';
			const [subcategoryRows] = await db.query(checkSubcategoryQuery, [snakeBody.subcategory_id]);
			if (subcategoryRows.length === 0) {
				return errorResponse(res, {}, 404, 'Danh mục con không tồn tại');
			}
		}

		// Kiểm tra trùng tên
		if (
			snakeBody.product_type_name_vn &&
			snakeBody.product_type_name_vn !== currentProductType.product_type_name_vn
		) {
			const checkNameQuery =
				'SELECT * FROM producttypes WHERE product_type_name_vn = ? AND product_type_id != ?';
			const [nameRows] = await db.query(checkNameQuery, [
				snakeBody.product_type_name_vn,
				product_type_id,
			]);
			if (nameRows.length > 0) {
				return errorResponse(res, {}, 400, 'Tên loại sản phẩm đã tồn tại');
			}
		}

		// Xử lý ảnh (chỉ cập nhật nếu có upload mới)
		let imageToUpdate = null;
		if (req.files && req.files['productTypeImage']) {
			// Upload ảnh mới
			newImageUrl = await uploadToCloudinary(
				req.files['productTypeImage'][0].buffer,
				CLOUDINARY_FOLDERS.PRODUCTTYPE
			);

			// Đánh dấu ảnh cũ để xóa
			if (currentProductType.image_url) {
				deletedImages.push(currentProductType.image_url);
			}

			imageToUpdate = newImageUrl;
		}

		const updateFields = [];
		const updateValues = [];

		// Các trường cập nhật
		if (snakeBody.product_type_name_vn) {
			updateFields.push('product_type_name_vn = ?');
			updateValues.push(snakeBody.product_type_name_vn);
		}
		if (snakeBody.subcategory_id) {
			updateFields.push('subcategory_id = ?');
			updateValues.push(snakeBody.subcategory_id);
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

		if (updateFields.length === 0) {
			return errorResponse(res, {}, 400, 'Không có trường nào để cập nhật');
		}

		const updateQuery = `UPDATE producttypes SET ${updateFields.join(
			', '
		)} WHERE product_type_id = ?`;
		updateValues.push(product_type_id);

		await db.query(updateQuery, updateValues);
		// Xóa ảnh cũ khỏi Cloudinary
		for (const imgUrl of deletedImages) {
			await deleteFromCloudinary(imgUrl);
		}

		// Xóa cache liên quan
		await deleteCachePattern('product_types*');

		return successResponse(res, {}, 200, 'Cập nhật loại sản phẩm thành công');
	} catch (error) {
		console.error('Error in updateProductTypeById:', error);
		return errorResponse(res, {}, 500, 'Lỗi máy chủ nội bộ');
	}
}
module.exports = updateProductTypeById;