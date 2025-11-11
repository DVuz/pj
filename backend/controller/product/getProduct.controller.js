const { successResponse, errorResponse } = require('../../utils/response');
const db = require('../../config/db.config');
const productQuerySchema = require('./helper/productValidate').productQuerySchema;
const { getCache, setCache, generateCacheKey } = require('../../utils/cache/redis');

/**
 * Controller to get products with filtering, sorting, pagination, and caching.
 */
const getProduct = async (req, res) => {
	try {
		const { error, value } = productQuerySchema.validate(req.query);
		if (error) {
			return errorResponse(res, {}, 400, error.details[0].message);
		}

		const {
			status,
			product_name_vn,
			product_type_id,
			category_id,
			subcategory_id,
			color_vn,
			min_price,
			max_price,
			page = 1,
			limit = 10,
			sort_by = 'created_at',
			sort_order = 'DESC',
		} = value;

		const offset = (page - 1) * limit;
		const cacheKey = generateCacheKey('products', value);

		const cachedData = await getCache(cacheKey);
		if (cachedData) {
			return successResponse(res, cachedData, 200, 'Get products from cache successfully', 'redis');
		}

		const whereConditions = [];
		const queryParams = [];

		if (product_name_vn) {
			whereConditions.push('p.product_name_vn LIKE ?');
			queryParams.push(`%${product_name_vn}%`);
		}

		if (status && status !== 'all') {
			whereConditions.push('p.status = ?');
			queryParams.push(status);
		}

		if (product_type_id) {
			whereConditions.push('p.product_type_id = ?');
			queryParams.push(product_type_id);
		}

		if (category_id) {
			whereConditions.push('c.category_id = ?');
			queryParams.push(category_id);
		}

		if (subcategory_id) {
			whereConditions.push('sc .subcategory_id = ?');
			queryParams.push(subcategory_id);
		}

		if (color_vn) {
			whereConditions.push('p.color_vn LIKE ?');
			queryParams.push(`%${color_vn}%`);
		}

		if (min_price !== undefined) {
			whereConditions.push('p.price >= ?');
			queryParams.push(min_price);
		}

		if (max_price !== undefined) {
			whereConditions.push('p.price <= ?');
			queryParams.push(max_price);
		}

		const whereClause = whereConditions.length > 0 ? `AND ${whereConditions.join(' AND ')}` : '';

		let orderByClause = '';
		if (sort_by === 'product_name_vn') {
			orderByClause = `p.product_name_vn ${sort_order}`;
		} else if (sort_by === 'created_at') {
			orderByClause = `p.created_at ${sort_order}`;
		} else if (sort_by === 'price') {
			orderByClause = `p.price ${sort_order}`;
		} else {
			orderByClause = `p.created_at DESC`;
		}

		// Query để lấy products
		const sql = `
        SELECT
            p.*,
            pt.product_type_id,
            pt.product_type_name_vn,
            sc.subcategory_id,
            sc.subcategory_name_vn,
            c.category_id,
            c.category_name_vn
        FROM products p
                 LEFT JOIN producttypes pt ON p.product_type_id = pt.product_type_id
                 LEFT JOIN subcategories sc ON pt.subcategory_id = sc.subcategory_id
                 LEFT JOIN categories c ON sc.category_id = c.category_id
        WHERE 1=1
            ${whereClause}
        ORDER BY ${orderByClause}
        LIMIT ? OFFSET ?
		`;

		const finalParams = [...queryParams, Number(limit), Number(offset)];
		const [rows] = await db.query(sql, finalParams);

		// Query để đếm tổng số records
		const countSql = `
        SELECT COUNT(DISTINCT p.product_id) AS total
        FROM products p
                 LEFT JOIN producttypes pt ON p.product_type_id = pt.product_type_id
                 LEFT JOIN subcategories sc ON pt.subcategory_id = sc.subcategory_id
                 LEFT JOIN categories c ON sc.category_id = c.category_id
        WHERE 1=1
            ${whereClause}
		`;

		const [countResult] = await db.query(countSql, queryParams);
		const total = countResult[0]?.total || 0;
		const totalPages = Math.ceil(total / limit);

		// Chuẩn bị response data với pagination
		const responseData = {
			products: rows,
			pagination: {
				page: parseInt(page, 10),
				limit: parseInt(limit, 10),
				total: parseInt(total, 10),
				totalPages,
			},
		};

		// Cache kết quả
		await setCache(cacheKey, responseData, 60);

		return successResponse(res, responseData, 200, 'Get products successfully', 'db');
	} catch (e) {
		console.error('Error in getProduct controller:', e);
		return errorResponse(res, {}, 500, 'Internal server error');
	}
};

module.exports =  getProduct ;
