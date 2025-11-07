const db = require('../../config/db.config');

const getCategoryByID = async (category_id, type = 'short') => {
  try {
    let sql;

    if (type === 'short') {
      sql = `
        SELECT
          category_id,
          category_name_vn,
          image_url,
          status
        FROM categories
        WHERE category_id = ?
      `;
    } else {
      sql = `
        SELECT *
        FROM categories
        WHERE category_id = ?
      `;
    }

    const [category] = await db.query(sql, [category_id]);
    console.log('category', category);

    return category;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};
module.exports = getCategoryByID;
