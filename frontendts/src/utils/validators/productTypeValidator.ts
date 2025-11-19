import type { ProductTypeFormData, ProductTypeFormErrors } from '../../types/product-type.type';

export const validateProductTypeForm = (data: ProductTypeFormData): ProductTypeFormErrors => {
  const errors: ProductTypeFormErrors = {};

  if (!data.productTypeNameVn?.trim()) {
    errors.productTypeNameVn = 'Tên loại sản phẩm là bắt buộc';
  }

  if (!data.status) {
    errors.status = 'Vui lòng chọn trạng thái';
  }

  const desc = (data.descriptionVn || '').trim();
  if (!desc || desc === '<p><br></p>' || desc === '<p></p>') {
    errors.descriptionVn = 'Mô tả loại sản phẩm là bắt buộc';
  }

  if (!data.productTypeImage) {
    errors.productTypeImage = 'Vui lòng chọn hình ảnh';
  }

  if (!data.subcategoryId) {
    errors.subcategoryId = 'Vui lòng chọn danh mục con';
  }

  return errors;
};

export const hasValidationErrors = (errors: ProductTypeFormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
