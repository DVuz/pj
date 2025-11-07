import { useRef, useState } from 'react';
import type { ImageUploadRef } from '../../components/admin/ImageUpload';
import type { SubcategoryFormData, SubcategoryFormErrors } from '@/types/subcategory.type';
import { INITIAL_SUBCATEGORY_FORM_DATA } from '../../constants/subCategoryConstants';
import {
  hasValidationErrors,
  validateSubcategoryForm,
} from '@/utils/validators/subcategoryValidator';
import { showToast } from '@/utils/toastMessages';
import { useCreateSubcategoryMutation } from '@/services/api/subcategoryApi';

export const useCreateSubcategory = () => {
  const [formData, setFormData] = useState<SubcategoryFormData>(INITIAL_SUBCATEGORY_FORM_DATA);
  const [errors, setErrors] = useState<SubcategoryFormErrors>({});

  const [createSubcategory, { isLoading }] = useCreateSubcategoryMutation();

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
    if (errors[name as keyof SubcategoryFormErrors]) {
      setErrors(prev => ({ ...prev, [name as keyof SubcategoryFormErrors]: '' }));
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

    setFormData(prev => ({ ...prev, subcategoryImage: file }));

    if (errors.subcategoryImage) {
      setErrors(prev => ({ ...prev, subcategoryImage: '' }));
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_SUBCATEGORY_FORM_DATA);
    setErrors({});
    imageUploadRef.current?.clearAll();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validationErrors = validateSubcategoryForm(formData);

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
      submitData.append('categoryId', String(formData.categoryId));
      submitData.append('subcategoryNameVn', formData.subcategoryNameVn);
      submitData.append('descriptionVn', formData.descriptionVn);
      submitData.append('status', formData.status);
      if (formData.subcategoryImage) {
        submitData.append('subcategoryImage', formData.subcategoryImage);
      }

      console.log('Form data to submit:', {
        categoryId: formData.categoryId,
        subcategoryNameVn: formData.subcategoryNameVn,
        descriptionVn: formData.descriptionVn,
        status: formData.status,
        subcategoryImage: formData.subcategoryImage?.name,
      });

      await createSubcategory(submitData).unwrap();

      showToast({
        message: 'Tạo danh mục con thành công',
        type: 'success',
      });
      resetForm();
    } catch (error) {
      console.error('Error creating subcategory:', error);
      showToast({
        message: 'Có lỗi xảy ra khi tạo danh mục con',
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
