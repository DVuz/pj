import type { CategoryFormData, FormErrors } from '../../types/category.type';

export const validateCategoryForm = (data: CategoryFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.categoryNameVn?.trim()) {
    errors.categoryNameVn = 'Tên danh mục là bắt buộc';
  }

  if (!data.status) {
    errors.status = 'Vui lòng chọn trạng thái';
  }

  const desc = (data.descriptionVn || '').trim();
  if (!desc || desc === '<p><br></p>' || desc === '<p></p>') {
    errors.descriptionVn = 'Mô tả danh mục là bắt buộc';
  }

  if (!data.categoryImage) {
    errors.categoryImage = 'Vui lòng chọn hình ảnh';
  }

  return errors;
};

export const hasValidationErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
