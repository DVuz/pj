const db = require('../../config/db.config');

const getSubcategoryWithCategoryJoin = async (subcategory_id, type = 'short') => {
  try {
    let sql;

    if (type === 'short') {
      sql = `
        SELECT
          s.subcategory_id,
          s.subcategory_name_vn,
          s.image_url as subcategory_image_url,
          s.status as subcategory_status,
          s.category_id,
          c.category_name_vn,
          c.image_url as category_image_url,
          c.status as category_status
        FROM subcategories s
        LEFT JOIN categories c ON s.category_id = c.category_id
        WHERE s.subcategory_id = ?
      `;
    } else {
      sql = `
        SELECT
          s.*,
          c.category_name_vn,
          c.description_vn as category_description_vn,
          c.image_url as category_image_url,
          c.status as category_status,
          c.created_at as category_created_at,
          c.updated_at as category_updated_at
        FROM subcategories s
        LEFT JOIN categories c ON s.category_id = c.category_id
        WHERE s.subcategory_id = ?
      `;
    }

    const [result] = await db.query(sql, [subcategory_id]);
    console.log('subcategory with category (JOIN):', result);

    return result;
  } catch (error) {
    console.error('Error fetching subcategory with category:', error);
    throw error;
  }
};

module.exports = getSubcategoryWithCategoryJoin;
