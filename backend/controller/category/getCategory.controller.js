const { successResponse, errorResponse } = require('../../utils/response');
const db = require('../../config/db.config');
const categoryQuerySchema = require('./helpers/categoryValidate').categoryQuerySchema;
const { getCache, setCache, generateCacheKey } = require('../../utils/cache/redis');
const getSubcategoryByCategoryID = require('../helpers/getSubcategoryByCategoryID');

/**
 * Controller to get categories with filtering, sorting, pagination, and caching.
 */
const getCategory = async (req, res) => {
  try {
    // Validate query parameters
    const { error, value } = categoryQuerySchema.validate(req.query);
    if (error) {
      return errorResponse(res, {}, 400, error.details[0].message);
    }

    const {
      status,
      category_name_vn,
      page = 1,
      limit = 10,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = value;

    // Calculate offset
    const offset = (page - 1) * limit;

    // Generate cache key
    const cacheKey = generateCacheKey('categories', value);

    // Try to get from cache first
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return successResponse(
        res,
        cachedData,
        200,
        'Get categories from cache successfully',
        'redis'
      );
    }

    // Build WHERE conditions dynamically
    const whereConditions = [];
    const queryParams = [];

    if (category_name_vn) {
      whereConditions.push('c.category_name_vn LIKE ?');
      queryParams.push(`%${category_name_vn}%`);
    }

    if (status && status !== 'all') {
      whereConditions.push('c.status = ?');
      queryParams.push(status);
    }

    const whereClause = whereConditions.length > 0 ? `AND ${whereConditions.join(' AND ')}` : '';

    // Build ORDER BY clause
    let orderByClause;
    if (sort_by === 'category_name_vn') {
      orderByClause = `c.category_name_vn ${sort_order}`;
    } else if (sort_by === 'created_at') {
      orderByClause = `c.created_at ${sort_order}`;
    } else {
      orderByClause = `c.created_at DESC`;
    }

    // Build SQL query
    const sql = `
      WITH CategoryStats AS (
        SELECT
          c.category_id,
          c.category_name_vn,
          c.description_vn,
          c.image_url,
          c.status,
          c.created_at,
          COUNT(DISTINCT s.subcategory_id) AS subcategory_count,
          COUNT(DISTINCT CASE WHEN s.status = 'active' THEN s.subcategory_id END) AS active_subcategory_count
        FROM categories c
        LEFT JOIN subcategories s ON c.category_id = s.category_id
        WHERE 1=1
          ${whereClause}
        GROUP BY
          c.category_id,
          c.category_name_vn,
          c.description_vn,
          c.image_url,
          c.status,
          c.created_at
        ORDER BY ${orderByClause}
        LIMIT ? OFFSET ?
      )
      SELECT
        cs.*
      FROM CategoryStats cs
    `;

    // Add limit and offset to params
    const finalParams = [...queryParams, limit, offset];
    // Execute query
    const [categories] = await db.query(sql, finalParams);
    // Get total count for pagination
    const countSql = `
      SELECT COUNT(DISTINCT c.category_id) as total
      FROM categories c
      WHERE 1=1
        ${whereClause}
    `;

    const [countResult] = await db.query(countSql, queryParams);

    const total = countResult?.[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    // Get subcategories for each category
    for (const category of categories) {
      category.subcategories = await getSubcategoryByCategoryID(category.category_id);
    }

    const response = {
      categories: categories || [],
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total: parseInt(total, 10),
        totalPages,
      },
    };

    // Save to cache with 60 seconds TTL
    await setCache(cacheKey, response, 60);

    return successResponse(res, response, 200, 'Get categories successfully', 'db');
  } catch (err) {
    console.error('Error in getCategory:', err);
    return errorResponse(res, {}, 500, 'Internal server error: ' + err.message);
  }
};

module.exports = getCategory;
