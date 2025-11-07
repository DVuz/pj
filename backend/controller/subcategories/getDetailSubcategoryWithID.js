const { successResponse, errorResponse } = require('../../utils/response');
const db = require('../../config/db.config');
const { getCache, setCache, generateCacheKey } = require('../../utils/cache/redis');
const { transformSubcategoryData, calculateStatistics } = require('../helpers/dataTransform');

const getDetailSubcategoryWithID = async (req, res) => {
  try {
    const { subcategory_id } = req.params;

    const cacheKey = generateCacheKey('subcategoryDetail', { subcategory_id });
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return successResponse(
        res,
        cachedData,
        200,
        'Get subcategory detail from cache successfully',
        'redis'
      );
    }

    const sql = `
      SELECT
          s.subcategory_id, s.subcategory_name_vn,
          s.description_vn AS subcategory_description,
          s.image_url AS subcategory_image,
          s.status AS subcategory_status,
          s.created_at AS subcategory_created_at,
          s.updated_at AS subcategory_updated_at,

          c.category_id, c.category_name_vn,
          c.image_url AS category_image,
          c.status AS category_status,

          pt.product_type_id, pt.product_type_name_vn,
          pt.description_vn AS product_type_description,
          pt.image_url AS product_type_image,
          pt.status AS product_type_status,
          pt.created_at AS product_type_created_at,
          pt.updated_at AS product_type_updated_at,

          p.product_id, p.product_code, p.product_name_vn,
          p.main_image, p.sub_image, p.length, p.width, p.height,
          p.material_vn, p.description_vn AS product_description,
          p.origin_vn, p.color_vn, p.public_date,
          p.status AS product_status, p.warranty_period, p.price,
          p.created_at AS product_created_at, p.updated_at AS product_updated_at

      FROM subcategories s
      LEFT JOIN categories c ON s.category_id = c.category_id
      LEFT JOIN producttypes pt ON s.subcategory_id = pt.subcategory_id
      LEFT JOIN products p ON pt.product_type_id = p.product_type_id
      WHERE s.subcategory_id = ?
      ORDER BY pt.product_type_name_vn, p.product_name_vn
    `;

    const [rows] = await db.query(sql, [subcategory_id]);

    let subcategoryData = transformSubcategoryData(rows);
    if (!subcategoryData) {
      return errorResponse(res, {}, 404, 'Subcategory not found');
    }

    subcategoryData = calculateStatistics(subcategoryData, 'subcategory');
    await setCache(cacheKey, subcategoryData, 300);

    return successResponse(res, subcategoryData, 200, 'Get subcategory detail successfully', 'db');
  } catch (err) {
    console.error('Error in getDetailSubcategoryWithID:', err);
    return errorResponse(res, {}, 500, 'Internal server error');
  }
};

module.exports = getDetailSubcategoryWithID;
