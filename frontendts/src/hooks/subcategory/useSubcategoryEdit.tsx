import type { ImageUploadRef } from '@/components/admin/ImageUpload';
import {
  useGetSubcategoryByIdQuery,
  useUpdateSubcategoryByIdMutation,
} from '@/services/api/subcategoryApi';
import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface SubcategoryFormData {
  subcategoryNameVn: string;
  descriptionVn: string;
  status: string;
  categoryId: string;
  subcategoryImage: string;
  subcategoryImageFile?: File | null;
  replaceSubcategoryImage?: boolean;
}

interface FormErrors {
  subcategoryNameVn?: string;
  descriptionVn?: string;
  status?: string;
  categoryId?: string;
  subcategoryImage?: string;
}

const INITIAL_FORM_DATA: SubcategoryFormData = {
  subcategoryNameVn: '',
  descriptionVn: '',
  status: 'active',
  categoryId: '',
  subcategoryImage: '',
  replaceSubcategoryImage: false,
};

export const useSubcategoryEdit = (subcategoryId: number) => {
  console.log('useSubcategoryEdit called with subcategoryId:', subcategoryId);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SubcategoryFormData>(INITIAL_FORM_DATA);
  const [originalData, setOriginalData] = useState<SubcategoryFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const imageUploadRef = useRef<ImageUploadRef>(null);

  // Fetch subcategory data
  const { data: subcategoryData, isFetching } = useGetSubcategoryByIdQuery(subcategoryId, {
    skip: !subcategoryId,
  });

  // Update mutation
  const [updateSubcategory] = useUpdateSubcategoryByIdMutation();

  // Load subcategory data vào form khi fetch xong
  useEffect(() => {
    if (subcategoryData?.data) {
      const subcategory = subcategoryData.data;
      console.log('Loading subcategory data:', subcategory);

      // Lấy category_id từ object category
      const categoryId = subcategory.category?.category_id || '';
      console.log('Extracted category_id:', categoryId);

      const loadedData: SubcategoryFormData = {
        subcategoryNameVn: subcategory.subcategory_name_vn || '',
        descriptionVn: subcategory.description_vn || '',
        status: subcategory.status || 'active',
        categoryId: String(categoryId),
        subcategoryImage: subcategory.image_url || '',
        replaceSubcategoryImage: false,
      };
      console.log('Loaded form data:', loadedData);
      console.log(
        'categoryId type:',
        typeof loadedData.categoryId,
        'value:',
        loadedData.categoryId
      );
      setFormData(loadedData);
      setOriginalData(loadedData);
    }
  }, [subcategoryData]);

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
        subcategoryImageFile: file,
        replaceSubcategoryImage: true,
      }));

      if (errors.subcategoryImage) {
        setErrors(prev => ({ ...prev, subcategoryImage: undefined }));
      }
    },
    [errors.subcategoryImage]
  );

  const handleRemoveImage = useCallback(() => {
    // Nếu đang có file mới, xóa nó và quay về ảnh cũ (nếu có)
    if (formData.subcategoryImageFile) {
      setFormData(prev => ({
        ...prev,
        subcategoryImageFile: null,
        replaceSubcategoryImage: false,
      }));
      imageUploadRef.current?.clearAll();
    } else {
      // Xóa ảnh cũ
      setFormData(prev => ({
        ...prev,
        subcategoryImage: '',
        subcategoryImageFile: null,
        replaceSubcategoryImage: true,
      }));
      imageUploadRef.current?.clearAll();
    }
  }, [formData.subcategoryImageFile]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.subcategoryNameVn.trim()) {
      newErrors.subcategoryNameVn = 'Tên danh mục con không được để trống';
    }

    if (!formData.descriptionVn.trim()) {
      newErrors.descriptionVn = 'Mô tả không được để trống';
    }

    if (!formData.status) {
      newErrors.status = 'Vui lòng chọn trạng thái';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Vui lòng chọn danh mục cha';
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
      formDataToSend.append('subcategory_name_vn', formData.subcategoryNameVn);
      formDataToSend.append('description_vn', formData.descriptionVn);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('category_id', formData.categoryId);

      // Append subcategory image if changed
      if (formData.replaceSubcategoryImage) {
        if (formData.subcategoryImageFile) {
          formDataToSend.append('subcategoryImage', formData.subcategoryImageFile);
        } else {
          // Nếu xóa subcategory image
          formDataToSend.append('remove_subcategory_image', 'true');
        }
      }

      // Call update API
      await updateSubcategory({ id: subcategoryId, formData: formDataToSend }).unwrap();

      toast.success('Cập nhật danh mục con thành công!');

      // Navigate back to list
      setTimeout(() => {
        navigate({ to: '/admin/subcategories/list' });
      }, 1000);
    } catch (error) {
      console.error('Error updating subcategory:', error);
      toast.error('Có lỗi xảy ra khi cập nhật danh mục con');
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
