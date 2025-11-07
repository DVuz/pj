const { successResponse, errorResponse } = require('../../utils/response');
const db = require('../../config/db.config');
const subcategoryQuerySchema = require('./helpers/subcategoryValidate').subcategoryQuerySchema;
const { getCache, setCache, generateCacheKey } = require('../../utils/cache/redis');
const getCategoryByID = require('../helpers/getCategoryByID');
const getPTBYSubCateID = require('../helpers/getPTBYSubCateID');

/**
 * Controller to get categories with filtering, sorting, pagination, and caching.
 */
const getSubcategory = async (req, res) => {
  try {
    const { error, value } = subcategoryQuerySchema.validate(req.query);
    if (error) {
      return errorResponse(res, {}, 400, error.details[0].message);
    }
    const {
      status,
      subcategory_name_vn,
      page = 1,
      limit = 10,
      sort_by = 'created_at',
      sort_order = 'DESC',
      category_id,
    } = value;

    const offset = (page - 1) * limit;
    const cacheKey = generateCacheKey('subcategories', value);

    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return successResponse(
        res,
        cachedData,
        200,
        'Get subcategories from cache successfully',
        'redis'
      );
    }

    const whereConditions = [];
    const queryParams = [];

    if (subcategory_name_vn) {
      whereConditions.push('sc.subcategory_name_vn LIKE ?');
      queryParams.push(`%${subcategory_name_vn}%`);
    }

    if (status && status !== 'all') {
      whereConditions.push('sc.status = ?');
      queryParams.push(status);
    }

    if (category_id) {
      whereConditions.push('sc.category_id = ?');
      queryParams.push(category_id);
    }

    const whereClause = whereConditions.length > 0 ? `AND ${whereConditions.join(' AND ')}` : '';

    let orderByClause = '';
    if (sort_by === 'subcategory_name_vn') {
      orderByClause = `sc.subcategory_name_vn ${sort_order}`;
    } else if (sort_by === 'created_at') {
      orderByClause = `sc.created_at ${sort_order}`;
    } else {
      orderByClause = `sc.created_at DESC`;
    }

    const sql = `
      WITH SubcategoryStats AS (
        SELECT
          sc.subcategory_id,
          sc.category_id,
          sc.description_vn,
          sc.subcategory_name_vn,
          sc.status,
          sc.created_at,
          COUNT(DISTINCT pt.product_type_id) AS product_type_count,
          COUNT(DISTINCT CASE WHEN sc.status = 'active' THEN sc.subcategory_id END) AS active_product_type_count
        FROM
          subcategories sc
        LEFT JOIN producttypes pt ON sc.subcategory_id = pt.subcategory_id
        WHERE 1=1
          ${whereClause}
        GROUP BY
          sc.subcategory_id
        ORDER BY ${orderByClause}
        LIMIT ? OFFSET ?
      )
      SELECT
        sc.*
      FROM SubcategoryStats sc
    `;
    const finalParams = [...queryParams, limit, offset];
    console.log('Final SQL Params:', finalParams);
    const [subcategories] = await db.query(sql, finalParams);

    const countSql = `
      SELECT COUNT(DISTINCT sc.subcategory_id) AS total
      FROM subcategories sc
      WHERE 1=1
      ${whereClause}
    `;

    const [countResult] = await db.execute(countSql, queryParams);
    const total = countResult[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    for (const subcategory of subcategories) {
      const category = await getCategoryByID(subcategory.category_id, 'short');
      subcategory.category = category?.[0] || null;

      const productTypes = await getPTBYSubCateID(subcategory.subcategory_id, 'short');
      subcategory.product_types = productTypes;
    }

    const response = {
      subcategories: subcategories || [],
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total: parseInt(total, 10),
        totalPages,
      },
    };
    await setCache(cacheKey, response, 60);
    return successResponse(res, response, 200, 'Get subcategories successfully', 'mysql');
  } catch (err) {
    console.error('Error in getSubcategory controller:', err);
    return errorResponse(res, {}, 500, 'Internal Server Error');
  }
};
module.exports = getSubcategory;
