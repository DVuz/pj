const { successResponse, errorResponse } = require('../../utils/response');
const db = require('../../config/db.config');
const { getCache, setCache, generateCacheKey } = require('../../utils/cache/redis');
const { transformProductTypeData, calculateStatistics } = require('../helpers/dataTransform');

const getDetailProductTypeWithID = async (req, res) => {
  try {
    const { product_type_id } = req.params;

    const cacheKey = generateCacheKey('productTypeDetail', { product_type_id });
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return successResponse(
        res,
        cachedData,
        200,
        'Get product type detail from cache successfully',
        'redis'
      );
    }

    const sql = `
      SELECT
          pt.product_type_id, pt.product_type_name_vn,
          pt.description_vn AS product_type_description,
          pt.image_url AS product_type_image,
          pt.status AS product_type_status,
          pt.created_at AS product_type_created_at,
          pt.updated_at AS product_type_updated_at,

          s.subcategory_id, s.subcategory_name_vn,
          s.image_url AS subcategory_image,
          s.status AS subcategory_status,

          c.category_id, c.category_name_vn,
          c.image_url AS category_image,
          c.status AS category_status,

          p.product_id, p.product_code, p.product_name_vn,
          p.main_image, p.sub_image, p.length, p.width, p.height,
          p.material_vn, p.description_vn AS product_description,
          p.origin_vn, p.color_vn, p.public_date,
          p.status AS product_status, p.warranty_period, p.price,
          p.created_at AS product_created_at, p.updated_at AS product_updated_at

      FROM producttypes pt
      LEFT JOIN subcategories s ON pt.subcategory_id = s.subcategory_id
      LEFT JOIN categories c ON s.category_id = c.category_id
      LEFT JOIN products p ON pt.product_type_id = p.product_type_id
      WHERE pt.product_type_id = ?
      ORDER BY p.product_name_vn
    `;

    const [rows] = await db.query(sql, [product_type_id]);

    let productTypeData = transformProductTypeData(rows);
    if (!productTypeData) {
      return errorResponse(res, {}, 404, 'Product type not found');
    }

    productTypeData = calculateStatistics(productTypeData, 'producttype');
    await setCache(cacheKey, productTypeData, 300);

    return successResponse(res, productTypeData, 200, 'Get product type detail successfully', 'db');
  } catch (err) {
    console.error('Error in getDetailProductTypeWithID:', err);
    return errorResponse(res, {}, 500, 'Internal server error');
  }
};

module.exports = getDetailProductTypeWithID;
