const db = require('../../config/db.config');

const getProductBYPTID = async (product_type_id, type = 'short') => {
  try {
    let sql;

    if (type === 'short') {
      sql = `
        SELECT
          product_id,
          product_code,
          product_name_vn,
          main_image,
          status,
          product_type_id
        FROM products
        WHERE product_type_id = ?
      `;
    } else {
      sql = `
        SELECT *
        FROM products
        WHERE product_type_id = ?
      `;
    }

    const [product] = await db.query(sql, [product_type_id]);
    console.log('Product 123', product);

    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};
module.exports = getProductBYPTID;
