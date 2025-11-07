import type { SubcategoryFormData, SubcategoryFormErrors } from '../../types/subcategory.type';

export const validateSubcategoryForm = (data: SubcategoryFormData): SubcategoryFormErrors => {
  const errors: SubcategoryFormErrors = {};

  if (!data.subcategoryNameVn?.trim()) {
    errors.subcategoryNameVn = 'Tên danh mục con là bắt buộc';
  }

  if (!data.status) {
    errors.status = 'Vui lòng chọn trạng thái';
  }

  const desc = (data.descriptionVn || '').trim();
  if (!desc || desc === '<p><br></p>' || desc === '<p></p>') {
    errors.descriptionVn = 'Mô tả danh mục là bắt buộc';
  }

  if (!data.subcategoryImage) {
    errors.subcategoryImage = 'Vui lòng chọn hình ảnh';
  }
  if (!data.categoryId) {
    errors.categoryId = 'Vui lòng chọn danh mục cha';
  }

  return errors;
};

export const hasValidationErrors = (errors: SubcategoryFormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
