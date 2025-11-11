const joi = require('joi');

const productQuerySchema = joi.object({
	status: joi.string().valid('active', 'inactive'),
	product_name_vn: joi.string().min(1).max(100),
	product_type_id: joi.number().integer().min(1),
	category_id:joi.number().integer().min(1),
	subcategory_id:joi.number().integer().min(1),
	color_vn: joi.string().min(1).max(50),
	min_price: joi.number().min(0),
	max_price: joi.number().min(0),
	created_at: joi.date(),
	page: joi.number().integer().min(1).default(1),
	limit: joi.number().integer().min(1).max(100).default(10),
	sort_by: joi.string().valid('product_name_vn', 'created_at','price').default('created_at'),
	sort_order: joi.string().valid('ASC', 'DESC').default('ASC'),
});
module.exports = { productQuerySchema };