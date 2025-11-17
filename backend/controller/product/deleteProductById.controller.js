const {successResponse, errorResponse} = require('../../utils/response');
const db = require('../../config/db.config');
const {
  deleteCachePattern,
} = require('../../utils/cache/redis');

const deleteProductById = async (req, res) => {
	try {
		const { product_id } = req.params;
		const sqlCheck = 'SELECT * FROM products WHERE product_id = ?';
		const [rows] = await db.query(sqlCheck, [product_id]);

		if (rows.length === 0) {
			return errorResponse(res, {}, 404, 'Product not found');
		}

		const sqlDelete = 'DELETE FROM products WHERE product_id = ?';
		await db.query(sqlDelete, [product_id]);
		await deleteCachePattern('products*');

		return successResponse(res, {}, 200, 'Product deleted successfully');
	} catch (error) {
		console.error('Error in deleteProductById:', error);
		return errorResponse(res, {}, 500, 'Internal server error');
	}
}
module.exports = deleteProductById;
