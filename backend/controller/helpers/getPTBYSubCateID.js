const db = require('../../config/db.config');

const getPTBYSubCateID = async (subcategory_id, type = 'short') => {
  try {
    let sql;

    if (type === 'short') {
      sql = `
        SELECT
          product_type_id,
          product_type_name_vn,
          image_url,
          status,
          subcategory_id
        FROM producttypes
        WHERE subcategory_id = ?
      `;
    } else {
      sql = `
        SELECT *
        FROM producttypes
        WHERE subcategory_id = ?
      `;
    }

    const [productType] = await db.query(sql, [subcategory_id]);
    console.log('productType 123', productType);

    return productType;
  } catch (error) {
    console.error('Error fetching product type:', error);
    throw error;
  }
};
module.exports = getPTBYSubCateID;
