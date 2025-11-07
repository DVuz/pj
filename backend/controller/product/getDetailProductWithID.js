const { successResponse, errorResponse } = require('../../utils/response');
const db = require('../../config/db.config');
const { getCache, setCache, generateCacheKey } = require('../../utils/cache/redis');
const { transformProductData } = require('../helpers/dataTransform');

const getDetailProductWithID = async (req, res) => {
  try {
    const { product_id } = req.params;

    const cacheKey = generateCacheKey('productDetail', { product_id });
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return successResponse(
        res,
        cachedData,
        200,
        'Get product detail from cache successfully',
        'redis'
      );
    }

    const sql = `
      SELECT
          p.product_id, p.product_code, p.product_name_vn,
          p.main_image, p.sub_image, p.length, p.width, p.height,
          p.material_vn, p.description_vn AS product_description,
          p.origin_vn, p.color_vn, p.public_date,
          p.status AS product_status, p.warranty_period, p.price,
          p.created_at AS product_created_at, p.updated_at AS product_updated_at,

          pt.product_type_id, pt.product_type_name_vn,
          pt.image_url AS product_type_image,
          pt.status AS product_type_status,

          s.subcategory_id, s.subcategory_name_vn,
          s.image_url AS subcategory_image,
          s.status AS subcategory_status,

          c.category_id, c.category_name_vn,
          c.image_url AS category_image,
          c.status AS category_status

      FROM products p
      LEFT JOIN producttypes pt ON p.product_type_id = pt.product_type_id
      LEFT JOIN subcategories s ON pt.subcategory_id = s.subcategory_id
      LEFT JOIN categories c ON s.category_id = c.category_id
      WHERE p.product_id = ?
    `;

    const [rows] = await db.query(sql, [product_id]);

    const productData = transformProductData(rows);
    if (!productData) {
      return errorResponse(res, {}, 404, 'Product not found');
    }

    await setCache(cacheKey, productData, 300);

    return successResponse(res, productData, 200, 'Get product detail successfully', 'db');
  } catch (err) {
    console.error('Error in getDetailProductWithID:', err);
    return errorResponse(res, {}, 500, 'Internal server error');
  }
};

module.exports = getDetailProductWithID;
