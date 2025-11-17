const { successResponse, errorResponse } = require('../../utils/response');
const db = require('../../config/db.config');
const {
	deleteCachePattern,
} = require('../../utils/cache/redis');
const deleteProductTypeById = async (req, res) => {
	try {
		const { product_type_id } = req.params;
		const sqlCheck = 'SELECT * FROM producttypes WHERE product_type_id = ?';
		const [rows] = await db.query(sqlCheck, [product_type_id]);

		if (rows.length === 0) {
			return errorResponse(res, {}, 404, 'Product type not found');
		}

		const sqlCheckProducts = `
			SELECT * from products WHERE product_type_id = ?
		`;
		const [prodRows] = await db.query(sqlCheckProducts, [product_type_id]);
		if (prodRows.length > 0) {
			return errorResponse(res, {}, 400, 'Không thể xóa loại sản phẩm vì tồn tại các sản phẩm');
		}

		const sqlDelete = 'DELETE FROM producttypes WHERE product_type_id = ?';
		await db.query(sqlDelete, [product_type_id]);
		await deleteCachePattern('product_types*');

		return successResponse(res, {}, 200, 'Product type deleted successfully');

	} catch (error) {
		console.error('Error in deleteProductTypeById:', error);
		return errorResponse(res, {}, 500, 'Internal server error');
	}
}
module.exports = deleteProductTypeById;