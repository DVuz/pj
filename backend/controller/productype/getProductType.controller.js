  const { successResponse, errorResponse } = require('../../utils/response');
  const db = require('../../config/db.config');
  const productTypeQuerySchema = require('./helpers/productypeValidate').productTypeQuerySchema;
  const { getCache, setCache, generateCacheKey } = require('../../utils/cache/redis');

  /**
   * Controller to get product types with filtering, sorting, pagination, and caching.
   * Optimized version - single query with JOINs
   */
  const getProductType = async (req, res) => {
    try {
      const { error, value } = productTypeQuerySchema.validate(req.query);
      if (error) {
        return errorResponse(res, {}, 400, error.details[0].message);
      }
      const {
        status,
        product_type_name_vn,
        page = 1,
        limit = 10,
        sort_by = 'created_at',
        sort_order = 'DESC',
        subcategory_id,
      } = value;

      const offset = (page - 1) * limit;
      const cacheKey = generateCacheKey('product_types', value);

      const cachedData = await getCache(cacheKey);
      if (cachedData) {
        return successResponse(
          res,
          cachedData,
          200,
          'Get product types from cache successfully',
          'redis'
        );
      }

      const whereConditions = [];
      const queryParams = [];

      if (product_type_name_vn) {
        whereConditions.push('pt.product_type_name_vn LIKE ?');
        queryParams.push(`%${product_type_name_vn}%`);
      }

      if (status && status !== 'all') {
        whereConditions.push('pt.status = ?');
        queryParams.push(status);
      }

      if (subcategory_id) {
        whereConditions.push('pt.subcategory_id = ?');
        queryParams.push(subcategory_id);
      }

      const whereClause = whereConditions.length > 0 ? `AND ${whereConditions.join(' AND ')}` : '';

      let orderByClause = '';
      if (sort_by === 'product_type_name_vn') {
        orderByClause = `pt.product_type_name_vn ${sort_order}`;
      } else if (sort_by === 'created_at') {
        orderByClause = `pt.created_at ${sort_order}`;
      } else {
        orderByClause = `pt.created_at DESC`;
      }

      //   QUERY DUY NHẤT - JOIN tất cả bảng cần thiết
      const sql = `
        WITH ProductTypeStats AS (
          SELECT
            pt.product_type_id,
            pt.product_type_name_vn,
            pt.description_vn,
            pt.image_url,
            pt.status,
            pt.subcategory_id,
            pt.created_at,
            pt.updated_at,
            COUNT(DISTINCT p.product_id) AS product_count,
            COUNT(DISTINCT CASE WHEN p.status = 'visible' THEN p.product_id END) AS active_product_count
          FROM producttypes pt
                 LEFT JOIN products p ON pt.product_type_id = p.product_type_id
          WHERE 1=1 ${whereClause}
        GROUP BY pt.product_type_id
        ORDER BY ${orderByClause}
        LIMIT ? OFFSET ?
          )
        SELECT
          pts.product_type_id,
          pts.product_type_name_vn,
          pts.description_vn,
          pts.image_url,
          pts.status,
          pts.subcategory_id,
          pts.created_at,
          pts.updated_at,
          pts.product_count,
          pts.active_product_count,

          -- Subcategory info
          s.subcategory_name_vn,
          s.image_url as subcategory_image_url,
          s.status as subcategory_status,
          s.category_id,

          -- Category info
          c.category_name_vn,
          c.image_url as category_image_url,
          c.status as category_status,

          -- Products info
          p.product_id,
          p.product_code,
          p.product_name_vn,
          p.main_image,
          p.status as product_status
        FROM ProductTypeStats pts
               LEFT JOIN subcategories s ON pts.subcategory_id = s.subcategory_id
               LEFT JOIN categories c ON s.category_id = c.category_id
               LEFT JOIN products p ON pts.product_type_id = p.product_type_id
        ORDER BY pts.${
          sort_by === 'product_type_name_vn' ? 'product_type_name_vn' : 'created_at'
        } ${sort_order}, p.product_id
      `;

      const finalParams = [...queryParams, Number(limit), Number(offset)];
      const [rows] = await db.query(sql, finalParams);

      //   Transform dữ liệu từ flat rows thành nested structure
      const productTypesMap = new Map();

      rows.forEach(row => {
        const ptId = row.product_type_id;

        // Tạo product type object nếu chưa tồn tại
        if (!productTypesMap.has(ptId)) {
          productTypesMap.set(ptId, {
            product_type_id: row.product_type_id,
            product_type_name_vn: row.product_type_name_vn,
            description_vn: row.description_vn,
            image_url: row.image_url,
            status: row.status,
            subcategory_id: row.subcategory_id,
            created_at: row.created_at,
            updated_at: row.updated_at,
            product_count: row.product_count,
            active_product_count: row.active_product_count,
            subcategory: row.subcategory_id
              ? [
                {
                  subcategory_id: row.subcategory_id,
                  subcategory_name_vn: row.subcategory_name_vn,
                  subcategory_image_url: row.subcategory_image_url,
                  subcategory_status: row.subcategory_status,
                  category_id: row.category_id,
                  category_name_vn: row.category_name_vn,
                  category_image_url: row.category_image_url,
                  category_status: row.category_status,
                },
              ]
              : [],
            products: [],
          });
        }

        // Thêm product vào danh sách (nếu có)
        const productType = productTypesMap.get(ptId);
        if (row.product_id && !productType.products.find(p => p.product_id === row.product_id)) {
          productType.products.push({
            product_id: row.product_id,
            product_code: row.product_code,
            product_name_vn: row.product_name_vn,
            main_image: row.main_image,
            status: row.product_status,
            product_type_id: ptId,
          });
        }
      });

      const productTypes = Array.from(productTypesMap.values());

      //   Count query
      const countSql = `
        SELECT COUNT(DISTINCT pt.product_type_id) AS total
        FROM producttypes pt
        WHERE 1=1 ${whereClause}
      `;
      const [countResult] = await db.query(countSql, queryParams);
      const total = countResult[0]?.total || 0;
      const totalPages = Math.ceil(total / limit);

      const responseData = {
        product_types: productTypes,
        pagination: {
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
          total: parseInt(total, 10),
          totalPages,
        },
      };

      await setCache(cacheKey, responseData, 60);
      return successResponse(res, responseData, 200, 'Get product types successfully', 'db');
    } catch (e) {
      console.error('Error in getProductType controller:', e);
      return errorResponse(res, {}, 500, 'Internal server error');
    }
  };

  module.exports = getProductType;
