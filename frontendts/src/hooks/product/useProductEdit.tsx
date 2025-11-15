import type { ImageUploadRef } from '@/components/admin/ImageUpload';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/services/api/productApi';
import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface ProductFormData {
  productCode: string;
  productNameVn: string;
  descriptionVn: string;
  productTypeId: string;
  price: string;
  warrantyPeriod: string;
  length: string;
  width: string;
  height: string;
  materialVn: string;
  originVn: string;
  colorVn: string;
  status: string;
  mainImage: string;
  subImages: string[]; // URLs của sub images hiện tại
  mainImageFile?: File | null;
  subImagesFiles?: File[];
  deletedSubImages?: string[]; // Track sub images bị xóa
  replaceMainImage?: boolean; // Flag để biết có thay main image không
}

interface FormErrors {
  productCode?: string;
  productNameVn?: string;
  descriptionVn?: string;
  productTypeId?: string;
  price?: string;
  warrantyPeriod?: string;
  length?: string;
  width?: string;
  height?: string;
  materialVn?: string;
  originVn?: string;
  colorVn?: string;
  status?: string;
  mainImage?: string;
  subImages?: string;
}

const INITIAL_FORM_DATA: ProductFormData = {
  productCode: '',
  productNameVn: '',
  descriptionVn: '',
  productTypeId: '',
  price: '',
  warrantyPeriod: '',
  length: '',
  width: '',
  height: '',
  materialVn: '',
  originVn: '',
  colorVn: '',
  status: 'active',
  mainImage: '',
  subImages: [],
  deletedSubImages: [],
  replaceMainImage: false,
};

export const useProductEdit = (productId: number) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA);
  const [originalData, setOriginalData] = useState<ProductFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const mainImageUploadRef = useRef<ImageUploadRef>(null);
  const subImagesUploadRef = useRef<ImageUploadRef>(null);

  // Fetch product data
  const { data: productData, isFetching } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  // Update mutation
  const [updateProduct] = useUpdateProductMutation();

  // Load product data vào form khi fetch xong
  useEffect(() => {
    if (productData?.data) {
      const product = productData.data;
      const loadedData: ProductFormData = {
        productCode: product.product_code || '',
        productNameVn: product.product_name_vn || '',
        descriptionVn: product.description_vn || '',
        productTypeId: product.product_type_id?.toString() || '',
        price: product.price?.toString() || '',
        warrantyPeriod: product.warranty_period?.toString() || '',
        length: product.length?.toString() || '',
        width: product.width?.toString() || '',
        height: product.height?.toString() || '',
        materialVn: product.material_vn || '',
        originVn: product.origin_vn || '',
        colorVn: product.color_vn || '',
        status: product.status || 'active',
        mainImage: product.main_image || '',
        subImages: Array.isArray(product.sub_image) ? product.sub_image : [],
      };
      setFormData(loadedData);
      setOriginalData(loadedData); // Lưu data gốc để reset
    }
  }, [productData]);

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

  const handleMainImageChange = useCallback(
    (e: { target: { name: string; value: File | File[] | null; files: File[] } }) => {
      const { value } = e.target;
      const file: File | null = Array.isArray(value)
        ? value.length > 0
          ? (value[0] as File)
          : null
        : (value as File | null);

      setFormData(prev => ({ ...prev, mainImageFile: file, replaceMainImage: true }));

      if (errors.mainImage) {
        setErrors(prev => ({ ...prev, mainImage: undefined }));
      }
    },
    [errors.mainImage]
  );

  const handleRemoveMainImage = useCallback(() => {
    setFormData(prev => ({ ...prev, mainImage: '', mainImageFile: null, replaceMainImage: true }));
    mainImageUploadRef.current?.clearAll();
  }, []);

  const handleSubImagesChange = useCallback(
    (e: { target: { name: string; value: File | File[] | null; files: File[] } }) => {
      const { files } = e.target;
      setFormData(prev => ({
        ...prev,
        subImagesFiles: prev.subImagesFiles ? [...prev.subImagesFiles, ...files] : files,
      }));

      if (errors.subImages) {
        setErrors(prev => ({ ...prev, subImages: undefined }));
      }
    },
    [errors.subImages]
  );

  const handleRemoveNewSubImage = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      subImagesFiles: prev.subImagesFiles?.filter((_, i) => i !== index),
    }));
  }, []);

  const handleRemoveSubImage = useCallback((imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      subImages: prev.subImages.filter(url => url !== imageUrl),
      deletedSubImages: [...(prev.deletedSubImages || []), imageUrl],
    }));
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.productCode.trim()) {
      newErrors.productCode = 'Mã sản phẩm không được để trống';
    }

    if (!formData.productNameVn.trim()) {
      newErrors.productNameVn = 'Tên sản phẩm không được để trống';
    }

    if (!formData.productTypeId) {
      newErrors.productTypeId = 'Vui lòng chọn loại sản phẩm';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Giá phải lớn hơn 0';
    }

    if (!formData.warrantyPeriod || parseInt(formData.warrantyPeriod) < 0) {
      newErrors.warrantyPeriod = 'Thời gian bảo hành không hợp lệ';
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
      formDataToSend.append('product_code', formData.productCode);
      formDataToSend.append('product_name_vn', formData.productNameVn);
      formDataToSend.append('description_vn', formData.descriptionVn);
      formDataToSend.append('product_type_id', formData.productTypeId);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('warranty_period', formData.warrantyPeriod);
      formDataToSend.append('status', formData.status);

      if (formData.length) formDataToSend.append('length', formData.length);
      if (formData.width) formDataToSend.append('width', formData.width);
      if (formData.height) formDataToSend.append('height', formData.height);
      if (formData.materialVn) formDataToSend.append('material_vn', formData.materialVn);
      if (formData.originVn) formDataToSend.append('origin_vn', formData.originVn);
      if (formData.colorVn) formDataToSend.append('color_vn', formData.colorVn);

      // Append main image if changed
      if (formData.replaceMainImage) {
        if (formData.mainImageFile) {
          formDataToSend.append('main_image', formData.mainImageFile);
        } else {
          // Nếu xóa main image
          formDataToSend.append('remove_main_image', 'true');
        }
      }

      // Append deleted sub images
      if (formData.deletedSubImages && formData.deletedSubImages.length > 0) {
        formDataToSend.append('deleted_sub_images', JSON.stringify(formData.deletedSubImages));
      }

      // Append sub images if changed
      if (formData.subImagesFiles && formData.subImagesFiles.length > 0) {
        formData.subImagesFiles.forEach((file: File) => {
          formDataToSend.append('sub_images', file);
        });
      }

      // Call update API
      await updateProduct({ productId, formData: formDataToSend }).unwrap();

      toast.success('Cập nhật sản phẩm thành công!');

      // Navigate back to list
      setTimeout(() => {
        navigate({ to: '/admin/products/list' });
      }, 1000);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Có lỗi xảy ra khi cập nhật sản phẩm');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = useCallback(() => {
    setFormData(originalData);
    setErrors({});
    mainImageUploadRef.current?.clearAll();
    subImagesUploadRef.current?.clearAll();
    toast.success('Đã khôi phục dữ liệu gốc');
  }, [originalData]);

  return {
    formData,
    errors,
    isLoading,
    isFetching,
    mainImageUploadRef,
    subImagesUploadRef,
    handleInputChange,
    handleMainImageChange,
    handleRemoveMainImage,
    handleSubImagesChange,
    handleRemoveSubImage,
    handleRemoveNewSubImage,
    handleSubmit,
    resetForm,
  };
};
