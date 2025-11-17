import type { ImageUploadRef } from '@/components/admin/ImageUpload';
import {
  useGetProductTypeByIdQuery,
  useUpdateProductTypeByIdMutation,
} from '@/services/api/productTypeApi';
import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface ProductTypeFormData {
  productTypeNameVn: string;
  descriptionVn: string;
  status: string;
  subcategoryId: string;
  productTypeImage: string;
  productTypeImageFile?: File | null;
  replaceProductTypeImage?: boolean;
}

interface FormErrors {
  productTypeNameVn?: string;
  descriptionVn?: string;
  status?: string;
  subcategoryId?: string;
  productTypeImage?: string;
}

const INITIAL_FORM_DATA: ProductTypeFormData = {
  productTypeNameVn: '',
  descriptionVn: '',
  status: 'active',
  subcategoryId: '',
  productTypeImage: '',
  replaceProductTypeImage: false,
};

export const useProductTypeEdit = (productTypeId: number) => {
  console.log('useProductTypeEdit called with productTypeId:', productTypeId);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductTypeFormData>(INITIAL_FORM_DATA);
  const [originalData, setOriginalData] = useState<ProductTypeFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const imageUploadRef = useRef<ImageUploadRef>(null);

  // Fetch product type data
  const { data: productTypeData, isFetching } = useGetProductTypeByIdQuery(productTypeId, {
    skip: !productTypeId,
  });

  // Update mutation
  const [updateProductType] = useUpdateProductTypeByIdMutation();

  // Load product type data vào form khi fetch xong
  useEffect(() => {
    if (productTypeData?.data) {
      const productType = productTypeData.data;
      console.log('Loading product type data:', productType);

      // Lấy subcategory_id từ object subcategory
      const subcategoryId = productType.subcategory?.subcategory_id || '';
      console.log('Extracted subcategory_id:', subcategoryId);

      const loadedData: ProductTypeFormData = {
        productTypeNameVn: productType.product_type_name_vn || '',
        descriptionVn: productType.description_vn || '',
        status: productType.status || 'active',
        subcategoryId: String(subcategoryId),
        productTypeImage: productType.image_url || '',
        replaceProductTypeImage: false,
      };
      console.log('Loaded form data:', loadedData);
      console.log(
        'subcategoryId type:',
        typeof loadedData.subcategoryId,
        'value:',
        loadedData.subcategoryId
      );
      setFormData(loadedData);
      setOriginalData(loadedData);
    }
  }, [productTypeData]);

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
        productTypeImageFile: file,
        replaceProductTypeImage: true,
      }));

      if (errors.productTypeImage) {
        setErrors(prev => ({ ...prev, productTypeImage: undefined }));
      }
    },
    [errors.productTypeImage]
  );

  const handleRemoveImage = useCallback(() => {
    // Nếu đang có file mới, xóa nó và quay về ảnh cũ (nếu có)
    if (formData.productTypeImageFile) {
      setFormData(prev => ({
        ...prev,
        productTypeImageFile: null,
        replaceProductTypeImage: false,
      }));
      imageUploadRef.current?.clearAll();
    } else {
      // Xóa ảnh cũ
      setFormData(prev => ({
        ...prev,
        productTypeImage: '',
        productTypeImageFile: null,
        replaceProductTypeImage: true,
      }));
      imageUploadRef.current?.clearAll();
    }
  }, [formData.productTypeImageFile]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.productTypeNameVn.trim()) {
      newErrors.productTypeNameVn = 'Tên loại sản phẩm không được để trống';
    }

    if (!formData.descriptionVn.trim()) {
      newErrors.descriptionVn = 'Mô tả không được để trống';
    }

    if (!formData.status) {
      newErrors.status = 'Vui lòng chọn trạng thái';
    }

    if (!formData.subcategoryId) {
      newErrors.subcategoryId = 'Vui lòng chọn danh mục con';
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
      formDataToSend.append('product_type_name_vn', formData.productTypeNameVn);
      formDataToSend.append('description_vn', formData.descriptionVn);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('subcategory_id', formData.subcategoryId);

      // Append product type image if changed
      if (formData.replaceProductTypeImage) {
        if (formData.productTypeImageFile) {
          formDataToSend.append('productTypeImage', formData.productTypeImageFile);
        } else {
          // Nếu xóa product type image
          formDataToSend.append('remove_product_type_image', 'true');
        }
      }

      // Call update API
      await updateProductType({ id: productTypeId, formData: formDataToSend }).unwrap();

      toast.success('Cập nhật loại sản phẩm thành công!');

      // Navigate back to list
      setTimeout(() => {
        navigate({ to: '/admin/product-types/list' });
      }, 1000);
    } catch (error) {
      console.error('Error updating product type:', error);
      toast.error('Có lỗi xảy ra khi cập nhật loại sản phẩm');
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
