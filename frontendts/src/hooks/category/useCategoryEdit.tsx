import type { ImageUploadRef } from '@/components/admin/ImageUpload';
import {
  useGetDetailCategoryByIdQuery,
  useUpdateCategoryByIdMutation,
} from '@/services/api/categoryApi';
import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface CategoryFormData {
  categoryNameVn: string;
  descriptionVn: string;
  status: string;
  categoryImage: string;
  categoryImageFile?: File | null;
  replaceCategoryImage?: boolean;
}

interface FormErrors {
  categoryNameVn?: string;
  descriptionVn?: string;
  status?: string;
  categoryImage?: string;
}

const INITIAL_FORM_DATA: CategoryFormData = {
  categoryNameVn: '',
  descriptionVn: '',
  status: 'active',
  categoryImage: '',
  replaceCategoryImage: false,
};

export const useCategoryEdit = (categoryId: number) => {
  console.log("useCategoryEdit called with categoryId:", categoryId);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CategoryFormData>(INITIAL_FORM_DATA);
  const [originalData, setOriginalData] = useState<CategoryFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const imageUploadRef = useRef<ImageUploadRef>(null);

  // Fetch category data
  const { data: categoryData, isFetching } = useGetDetailCategoryByIdQuery(categoryId, {
    skip: !categoryId,
  });

  // Update mutation
  const [updateCategory] = useUpdateCategoryByIdMutation();

  // Load category data vào form khi fetch xong
  useEffect(() => {
    if (categoryData?.data) {
      const category = categoryData.data;
      const loadedData: CategoryFormData = {
        categoryNameVn: category.category_name_vn || '',
        descriptionVn: category.description_vn || '',
        status: category.status || 'active',
        categoryImage: category.image_url || '',
        replaceCategoryImage: false,
      };
      setFormData(loadedData);
      setOriginalData(loadedData);
    }
  }, [categoryData]);

  const handleInputChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
        | { target: { name?: string; value: unknown } }
    ) => {
      const target = e.target as EventTarget & { name?: string; value: unknown };
      const name = target.name as string | undefined;
      let value = target.value;

      if (!name) return;

      if (typeof value !== 'string') {
        if (Array.isArray(value)) {
          value = value.join(',');
        } else {
          value = value !== undefined && value !== null ? String(value) : '';
        }
      }

      setFormData(prev => ({ ...prev, [name]: value as string }));

      // Clear error for this field
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleImageChange = useCallback(
    (e: { target: { name: string; value: File | File[] | null; files: File[] } }) => {
      const { value } = e.target;
      const file: File | null = Array.isArray(value)
        ? value.length > 0
          ? (value[0] as File)
          : null
        : (value as File | null);

      setFormData(prev => ({
        ...prev,
        categoryImageFile: file,
        replaceCategoryImage: true,
      }));

      if (errors.categoryImage) {
        setErrors(prev => ({ ...prev, categoryImage: undefined }));
      }
    },
    [errors.categoryImage]
  );

  const handleRemoveImage = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      categoryImage: '',
      categoryImageFile: null,
      replaceCategoryImage: true,
    }));
    imageUploadRef.current?.clearAll();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.categoryNameVn.trim()) {
      newErrors.categoryNameVn = 'Tên danh mục không được để trống';
    }

    if (!formData.descriptionVn.trim()) {
      newErrors.descriptionVn = 'Mô tả không được để trống';
    }

    if (!formData.status) {
      newErrors.status = 'Vui lòng chọn trạng thái';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Vui lòng kiểm tra lại thông tin');
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append text fields
      formDataToSend.append('category_name_vn', formData.categoryNameVn);
      formDataToSend.append('description_vn', formData.descriptionVn);
      formDataToSend.append('status', formData.status);

      // Append category image if changed
      if (formData.replaceCategoryImage) {
        if (formData.categoryImageFile) {
          formDataToSend.append('categoryImage', formData.categoryImageFile);
        } else {
          // Nếu xóa category image
          formDataToSend.append('remove_category_image', 'true');
        }
      }

      // Call update API
      await updateCategory({id: categoryId, formData: formDataToSend }).unwrap();

      toast.success('Cập nhật danh mục thành công!');

      // Navigate back to list
      setTimeout(() => {
        navigate({ to: '/admin/categories/list' });
      }, 1000);
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Có lỗi xảy ra khi cập nhật danh mục');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = useCallback(() => {
    setFormData(originalData);
    setErrors({});
    imageUploadRef.current?.clearAll();
    toast.success('Đã khôi phục dữ liệu gốc');
  }, [originalData]);

  return {
    formData,
    errors,
    isLoading,
    isFetching,
    imageUploadRef,
    handleInputChange,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
    resetForm,
  };
};
