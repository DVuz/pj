const { successResponse, errorResponse } = require('../../utils/response');
const db = require('../../config/db.config');
const {
  deleteCachePattern,
} = require('../../utils/cache/redis');

const deleteCategoryById = async (req, res) => {
  try {
    const { category_id } = req.params;
    const sqlCheck = 'SELECT * FROM categories WHERE category_id = ?';
    const [rows] = await db.query(sqlCheck, [category_id]);

    if (rows.length === 0) {
      return errorResponse(res, {}, 404, 'Category not found');
    }
    const sqlCheckSubcategories = `
      SELECT * from subcategories WHERE category_id = ?
    `;
    const [subcatRows] = await db.query(sqlCheckSubcategories, [category_id]);
    if (subcatRows.length > 0) {
      return errorResponse(res, {}, 400, 'Không thể xóa danh mục vì tồn tại các danh mục con');
    }

    const sqlDelete = 'DELETE FROM categories WHERE category_id = ?';
    await db.query(sqlDelete, [category_id]);
    await deleteCachePattern('categories*');

    return successResponse(res, {}, 200, 'Category deleted successfully');
  } catch (error) {
    console.error('Error in deleteCategoryById:', error);
    return errorResponse(res, {}, 500, 'Internal server error');
  }
}
module.exports = deleteCategoryById;
