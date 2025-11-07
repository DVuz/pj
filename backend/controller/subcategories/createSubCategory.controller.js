const {successResponse, errorResponse} = require('../../utils/response');
const db = require('../../config/db.config');
const validateImages = require('../../utils/validateImage');
const uploadToCloudinary = require('../../utils/uploadToCloudinary');
const CLOUDINARY_FOLDERS = require('../../config/folderStucture');
const camelObjToSnakeObj = require('../../utils/camelToSnake');

const createSubCategory = async (req, res) => {
	try {
		const validateImageResult = validateImages(req.files);
		if (!validateImageResult.valid) {
			return errorResponse(res, {}, 400, validateImageResult.message);
		}

		let createSubCategoryImageUrl = '';
		const snakeBody = camelObjToSnakeObj(req.body);
		console.log(snakeBody)

		const checkSubCategoryExisted = 'Select * from subcategories where subcategory_name_vn = ?';
		const subCategoryExisted = await db.query(checkSubCategoryExisted, [snakeBody.subcategory_name_vn]);
		if (subCategoryExisted[0].length > 0) {
			return errorResponse(res, {}, 400, 'Danh mục con đã tồn tại');
		}
		if (req.files && req.files['subcategoryImage']) {
			createSubCategoryImageUrl = await uploadToCloudinary(
				req.files['subcategoryImage'][0].buffer,
				CLOUDINARY_FOLDERS.SUBCATEGORY
			);
		}
		const insertSubCategoryQuery = `
        INSERT INTO subcategories (category_id, subcategory_name_vn, description_vn, status, image_url, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
		`;

		await db.query(insertSubCategoryQuery, [
			snakeBody.category_id,
			snakeBody.subcategory_name_vn,
			snakeBody.description_vn,
			snakeBody.status,
			createSubCategoryImageUrl,
			new Date(),
		]);

		return successResponse(res, {}, 201, 'Tạo danh mục con thành công');

	} catch (error) {
		console.error('Error creating subcategory:', error);
		return errorResponse(res, {}, 500, 'Lỗi server');
	}
}
module.exports = {createSubCategory};
