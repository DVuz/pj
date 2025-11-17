const { successResponse, errorResponse } = require('../../utils/response');
const db = require('../../config/db.config');
const {
  deleteCachePattern,
} = require('../../utils/cache/redis');

const deleteSubcategoryById = async (req, res) => {
  try {
    const { subcategory_id } = req.params;
    const sqlCheck = 'SELECT * FROM subcategories WHERE subcategory_id = ?';
    const [rows] = await db.query(sqlCheck, [subcategory_id]);

    if (rows.length === 0) {
      return errorResponse(res, {}, 404, 'Subcategory not found');
    }

    const sqlCheckProducttypes = `
      SELECT * from producttypes WHERE subcategory_id = ?
    `;
    const [prodTypeRows] = await db.query(sqlCheckProducttypes, [subcategory_id]);
    if (prodTypeRows.length > 0) {
      return errorResponse(res, {}, 400, 'Không thể xóa danh mục con vì tồn tại các loại sản phẩm');
    }

    const sqlDelete = 'DELETE FROM subcategories WHERE subcategory_id = ?';
    await db.query(sqlDelete, [subcategory_id]);
    await deleteCachePattern('subcategories*');

    return successResponse(res, {}, 200, 'Subcategory deleted successfully');

  } catch (error) {
    console.error('Error in deleteSubcategoryById:', error);
    return errorResponse(res, {}, 500, 'Internal server error');
  }
}
module.exports = deleteSubcategoryById;
