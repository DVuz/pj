import { useRef, useState } from 'react';
import type { ImageUploadRef } from '../../components/admin/ImageUpload';
import type { CategoryFormData, FormErrors } from '../../types/category.type';
import { INITIAL_FORM_DATA } from '../../constants/categoryConstants';
import {
  validateCategoryForm,
  hasValidationErrors,
} from '../../utils/validators/categoryValidator';
import { showToast } from '../../utils/toastMessages';
import { useCreateCategoryMutation } from '../../services/api/categoryApi';

export const useCategoryForm = () => {
  const [formData, setFormData] = useState<CategoryFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

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
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name as keyof FormErrors]: '' }));
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

    setFormData(prev => ({ ...prev, categoryImage: file }));

    if (errors.categoryImage) {
      setErrors(prev => ({ ...prev, categoryImage: '' }));
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    imageUploadRef.current?.clearAll();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validationErrors = validateCategoryForm(formData);

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
      submitData.append('categoryNameVn', formData.categoryNameVn);
      submitData.append('descriptionVn', formData.descriptionVn);
      submitData.append('status', formData.status);
      if (formData.categoryImage) {
        submitData.append('categoryImage', formData.categoryImage);
      }

      console.log('Form data to submit:', {
        categoryNameVn: formData.categoryNameVn,
        descriptionVn: formData.descriptionVn,
        status: formData.status,
        categoryImage: formData.categoryImage?.name,
      });

      await createCategory(submitData).unwrap();

      showToast({
        message: 'Tạo danh mục thành công',
        type: 'success',
      });
      resetForm();
    } catch (error) {
      console.error('Error creating category:', error);
      showToast({
        message: 'Có lỗi xảy ra khi tạo danh mục',
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
