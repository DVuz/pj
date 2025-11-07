const db = require('../../config/db.config');

const getSubcategoryByCategoryID = async (category_id, type = 'short') => {
  try {
    let sql;

    if (type === 'short') {
      sql = `
        SELECT
          subcategory_id,
          subcategory_name_vn,
          image_url,
          status
        FROM subcategories
        WHERE category_id = ?
      `;
    } else {
      sql = `
        SELECT *
        FROM subcategories
        WHERE subcategory_id = ?
      `;
    }

    const [subcategory] = await db.query(sql, [category_id]);
    console.log('subcategory', subcategory);

    return subcategory;
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    throw error;
  }
};
module.exports = getSubcategoryByCategoryID;
