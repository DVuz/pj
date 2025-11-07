const joi = require('joi');

const categoryQuerySchema = joi.object({
  category_id: joi.number().integer().min(1),
  status: joi.string().valid('active', 'inactive','all'),
  category_name_vn: joi.string().min(1).max(100),
  description_vn: joi.string().min(1).max(255),
  created_at: joi.date(),
  page: joi.number().integer().min(1).default(1),
  limit: joi.number().integer().min(1).max(100).default(10),
  sort_by: joi
    .string()
    .valid('category_name_vn', 'created_at')
    .default('created_at'),
  sort_order: joi.string().valid('ASC', 'DESC').default('ASC'),
});
module.exports = { categoryQuerySchema };
