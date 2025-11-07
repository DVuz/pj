const joi = require('joi');

const subcategoryQuerySchema = joi.object({
	status: joi.string().valid('active', 'inactive'),
	category_id: joi.number().integer().min(1),
	subcategory_name_vn: joi.string().min(1).max(100),
	page: joi.number().integer().min(1).default(1),
	limit: joi.number().integer().min(1).max(100).default(10),
	sort_by: joi
		.string()
		.valid('subcategory_name_vn', 'created_at')
		.default('created_at'),
	sort_order: joi.string().valid('ASC', 'DESC').default('ASC'),
});

module.exports = { subcategoryQuerySchema };
