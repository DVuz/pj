const joi = require('joi');

const productTypeQuerySchema = joi.object({
  status: joi.string().valid('active', 'inactive'),
  subcategory_id: joi.number().integer().min(1),
  product_type_name_vn: joi.string().min(1).max(100),
  description_vn: joi.string().min(1).max(100),
  created_at: joi.date(),
  page: joi.number().integer().min(1).default(1),
  limit: joi.number().integer().min(1).max(100).default(10),
  sort_by: joi.string().valid('product_type_name_vn', 'created_at').default('created_at'),
  sort_order: joi.string().valid('ASC', 'DESC').default('ASC'),
});

module.exports = {productTypeQuerySchema};
