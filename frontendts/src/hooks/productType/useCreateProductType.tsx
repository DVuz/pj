import { useCreateProductTypeMutation } from '@/services/api/productTypeApi';
import type { ProductTypeFormData, ProductTypeFormErrors } from '@/types/product-type.type';
import { showToast } from '@/utils/toastMessages';
import {
  hasValidationErrors,
  validateProductTypeForm,
} from '@/utils/validators/productTypeValidator';
import { useRef, useState } from 'react';
import type { ImageUploadRef } from '../../components/admin/ImageUpload';
import { INITIAL_PRODUCT_TYPE_FORM_DATA } from '../../constants/productTypeConstants';

export const useCreateProductType = () => {
  const [formData, setFormData] = useState<ProductTypeFormData>(INITIAL_PRODUCT_TYPE_FORM_DATA);
  const [errors, setErrors] = useState<ProductTypeFormErrors>({});

  const [createProductType, { isLoading }] = useCreateProductTypeMutation();

  const imageUploadRef = useRef<ImageUploadRef>(null);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | { target: { name?: string; value: unknown } }
  ) => {
    const target = e.target as EventTarget & { name?: string; value: unknown };
    const name = target.name as string | undefined;
    let value = target.value;

    if (!name) return;

    // Normalize value to string for string fields
    if (typeof value !== 'string') {
      if (Array.isArray(value)) {
        value = value.join(',');
      } else {
        value = value !== undefined && value !== null ? String(value) : '';
      }
    }

    setFormData(prev => ({ ...prev, [name]: value as string }));

    // Clear error when user changes input
    if (errors[name as keyof ProductTypeFormErrors]) {
      setErrors(prev => ({ ...prev, [name as keyof ProductTypeFormErrors]: '' }));
    }
  };

  const handleImageChange = (e: {
    target: { name: string; value: File | File[] | null; files: File[] };
  }) => {
    const { value, files } = e.target;

    const file: File | null = Array.isArray(value)
      ? value.length > 0
        ? (value[0] as File)
        : null
      : (value as File | null);

    console.log('Selected files:', files);

    setFormData(prev => ({ ...prev, productTypeImage: file }));

    if (errors.productTypeImage) {
      setErrors(prev => ({ ...prev, productTypeImage: '' }));
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_PRODUCT_TYPE_FORM_DATA);
    setErrors({});
    imageUploadRef.current?.clearAll();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validationErrors = validateProductTypeForm(formData);

      if (hasValidationErrors(validationErrors)) {
        setErrors(validationErrors);
        showToast({
          message: 'Vui lòng kiểm tra lại thông tin form',
          type: 'error',
        });
        return;
      }

      setErrors({});

      // Create FormData for API call
      const submitData = new FormData();
      submitData.append('subcategoryId', String(formData.subcategoryId));
      submitData.append('productTypeNameVn', formData.productTypeNameVn);
      submitData.append('descriptionVn', formData.descriptionVn);
      submitData.append('status', formData.status);
      if (formData.productTypeImage) {
        submitData.append('productTypeImage', formData.productTypeImage);
      }

      console.log('Form data to submit:', {
        subcategoryId: formData.subcategoryId,
        productTypeNameVn: formData.productTypeNameVn,
        descriptionVn: formData.descriptionVn,
        status: formData.status,
        productTypeImage: formData.productTypeImage?.name,
      });

      await createProductType(submitData).unwrap();

      showToast({
        message: 'Tạo loại sản phẩm thành công',
        type: 'success',
      });
      resetForm();
    } catch (error) {
      console.error('Error creating product type:', error);
      showToast({
        message: 'Có lỗi xảy ra khi tạo loại sản phẩm',
        type: 'error',
      });
    }
  };

  return {
    formData,
    errors,
    isLoading,
    imageUploadRef,
    handleInputChange,
    handleImageChange,
    handleSubmit,
    resetForm,
  };
};
