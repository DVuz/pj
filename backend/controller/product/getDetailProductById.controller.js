const {successResponse, errorResponse} = require('../../utils/response');
const db = require('../../config/db.config');
const {getCache, setCache, generateCacheKey} = require('../../utils/cache/redis');

const getDetailProductById = async (req, res) => {
	try {
    const { product_id } = req.params;

    const cacheKey = generateCacheKey('productDetail', { product_id });
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
    	return successResponse(res, cachedData, 200, 'Get product detail from cache successfully', 'redis');
    }

    const sql = `
        SELECT
            p.*,
            c.category_id, c.category_name_vn,
            sc.subcategory_id, sc.subcategory_name_vn,
            pt.product_type_id, pt.product_type_name_vn
        FROM products p
                 LEFT JOIN producttypes pt ON p.product_type_id = pt.product_type_id
                 LEFT JOIN subcategories sc ON pt.subcategory_id = sc.subcategory_id
                 LEFT JOIN categories c ON sc.category_id = c.category_id
        WHERE p.product_id = ?
		`;

    const [rows] = await db.query(sql, [product_id]);

    if (rows.length === 0) {
      return errorResponse(res, {}, 404, 'Product not found');
    }

    const productData = rows[0];
    console.log('productData:', productData);
    try {
      if (productData.sub_image && typeof productData.sub_image === 'string') {
        productData.sub_image = JSON.parse(productData.sub_image);
      }
    } catch (err) {
      console.warn('Failed to parse sub_image:', err);
    }


    await setCache(cacheKey, productData, 300);

    return successResponse(res, productData, 200, 'Get product detail successfully', 'db');
  } catch (error) {
		console.error('Error in getDetailProductById:', error);
		return errorResponse(res, {}, 500, 'Internal server error');
	}
};

module.exports = getDetailProductById;
