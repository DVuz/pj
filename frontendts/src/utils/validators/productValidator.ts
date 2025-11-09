import type { ProductFormData, FormErrors } from '@/types/product.type.ts';

/**
 * Validate product form data
 * @param formData - Product form data to validate
 * @returns Object containing validation errors
 */
export const validateProductForm = (formData: ProductFormData): FormErrors => {
	const errors: FormErrors = {};
	
	// Product code validation
	if (!formData.productCode.trim()) {
		errors.productCode = 'Mã sản phẩm không được để trống';
	}
	
	// Product name validation
	if (!formData.productNameVn.trim()) {
		errors.productNameVn = 'Tên sản phẩm không được để trống';
	}
	
	// Main image validation
	if (!formData.mainImage) {
		errors.mainImage = 'Vui lòng tải lên ảnh chính';
	}
	
	// Price validation
	if (!formData.price || parseFloat(formData.price) <= 0) {
		errors.price = 'Giá sản phẩm phải lớn hơn 0';
	}
	
	// Warranty period validation
	if (!formData.warrantyPeriod || parseInt(formData.warrantyPeriod) < 0) {
		errors.warrantyPeriod = 'Thời gian bảo hành không hợp lệ';
	}
	
	// Optional: Dimension validations
	if (formData.length && parseFloat(formData.length) <= 0) {
		errors.length = 'Chiều dài phải lớn hơn 0';
	}
	
	if (formData.width && parseFloat(formData.width) <= 0) {
		errors.width = 'Chiều rộng phải lớn hơn 0';
	}
	
	if (formData.height && parseFloat(formData.height) <= 0) {
		errors.height = 'Chiều cao phải lớn hơn 0';
	}
	
	return errors;
};

/**
 * Check if there are any validation errors
 * @param errors - Validation errors object
 * @returns True if errors exist, false otherwise
 */
export const hasValidationErrors = (errors: FormErrors): boolean => {
	return Object.keys(errors).length > 0;
};
