import ImageUpload from '@/components/admin/ImageUpload.tsx';
import Button from '@/components/ui/custome/Button';
import Input from '@/components/ui/custome/Input';
import Select from '@/components/ui/custome/Select';
import Loading from '@/components/ui/Loading';
import TipTapEditor from '@/components/ui/TipTapEditor.tsx';
import { STATUS_OPTIONS } from '@/constants/categoryConstants.ts';
import { useProductTypeEdit } from '@/hooks/product-type/useProductTypeEdit';
import { useGetSubcategoriesQuery } from '@/services/api/subcategoryApi';
import type { Subcategory } from '@/types/subcategory.type';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ArrowLeft, X } from 'lucide-react';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const EditProductTypePage: React.FC = () => {
  const { productTypeId } = useParams({ strict: false });
  console.log('Editing product type ID:', productTypeId);
  const navigate = useNavigate();
  const [previewModal, setPreviewModal] = React.useState({
    isOpen: false,
    imageUrl: '',
    imageName: '',
  });

  // Fetch subcategories for select
  const { data: subcategoriesData, isLoading: loadingSubcategories } = useGetSubcategoriesQuery({});
  const subcategoryOptions =
    subcategoriesData?.data?.subcategories?.map((subcategory: Subcategory) => ({
      value: subcategory.subcategory_id.toString(),
      label: subcategory.subcategory_name_vn,
    })) || [];
  console.log('Fetched subcategories for select:', subcategoryOptions);

  const {
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
  } = useProductTypeEdit(productTypeId ? parseInt(productTypeId as string) : 0);

  console.log('Subcategory options:', subcategoryOptions);
  console.log('Current subcategoryId from formData:', formData.subcategoryId);

  const handleBack = () => {
    navigate({ to: '/admin/product-types/list' });
  };

  const openPreview = (imageUrl: string, imageName: string) => {
    setPreviewModal({ isOpen: true, imageUrl, imageName });
  };

  const closePreview = () => {
    setPreviewModal({ isOpen: false, imageUrl: '', imageName: '' });
  };

  if (isFetching || loadingSubcategories) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading text="Đang tải thông tin loại sản phẩm..." />
      </div>
    );
  }

  // Đảm bảo có dữ liệu trước khi render form
  if (!formData.productTypeNameVn && productTypeId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading text="Đang tải dữ liệu..." />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-4 px-6">
      <Toaster />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <Button
            variant="secondary"
            size="small"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa loại sản phẩm</h1>
            <p className="text-sm text-gray-600 mt-1">
              Cập nhật thông tin loại sản phẩm #{productTypeId}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* 1. Basic Information */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                1. Thông tin cơ bản
              </h2>

              <div className="space-y-3">
                <Select
                  label="Danh mục con"
                  name="subcategoryId"
                  value={formData.subcategoryId}
                  onChange={handleInputChange}
                  options={subcategoryOptions}
                  placeholder="Chọn danh mục con..."
                  required
                  error={errors.subcategoryId}
                  disabled={isLoading || loadingSubcategories}
                />

                <Input
                  label="Tên loại sản phẩm"
                  type="text"
                  name="productTypeNameVn"
                  placeholder="Nhập tên loại sản phẩm..."
                  value={formData.productTypeNameVn}
                  onChange={handleInputChange}
                  required
                  error={errors.productTypeNameVn}
                  disabled={isLoading}
                />

                <Select
                  label="Trạng thái"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  options={STATUS_OPTIONS}
                  placeholder="Chọn trạng thái..."
                  required
                  error={errors.status}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* 2. Description */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                2. Mô tả loại sản phẩm
              </h2>

              <TipTapEditor
                label=""
                name="descriptionVn"
                value={formData.descriptionVn}
                onChange={handleInputChange}
                placeholder="Nhập mô tả chi tiết về loại sản phẩm..."
                height="200px"
                error={errors.descriptionVn}
                disabled={isLoading}
              />
            </div>

            {/* 3. Image */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                3. Hình ảnh loại sản phẩm
              </h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <ImageUpload
                  ref={imageUploadRef}
                  label="Hình ảnh loại sản phẩm"
                  name="productTypeImage"
                  onChange={handleImageChange}
                  required
                  maxSize={5}
                  error={errors.productTypeImage}
                  disabled={isLoading}
                  preview={false}
                />

                {/* Hiển thị ảnh hiện tại (nếu chưa thay thế) */}
                {formData.productTypeImage &&
                  !formData.productTypeImageFile &&
                  !formData.replaceProductTypeImage && (
                    <div className="mt-2 relative">
                      <p className="text-xs text-gray-600 mb-1">Hình ảnh hiện tại:</p>
                      <div className="relative inline-block group">
                        <img
                          src={formData.productTypeImage}
                          alt="Current product type"
                          className="w-32 h-32 object-cover rounded border cursor-pointer hover:opacity-75 transition-opacity"
                          onClick={() =>
                            openPreview(formData.productTypeImage, 'Hình ảnh loại sản phẩm')
                          }
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          title="Xóa hình ảnh"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                {/* Hiển thị ảnh mới được chọn */}
                {formData.productTypeImageFile && (
                  <div className="mt-2 relative">
                    <p className="text-xs text-green-700 font-semibold mb-1">Hình ảnh mới:</p>
                    <div className="relative inline-block group">
                      <img
                        src={URL.createObjectURL(formData.productTypeImageFile)}
                        alt="New product type"
                        className="w-32 h-32 object-cover rounded border-2 border-green-300 cursor-pointer hover:opacity-75 transition-opacity"
                        onClick={() =>
                          openPreview(
                            URL.createObjectURL(formData.productTypeImageFile!),
                            formData.productTypeImageFile!.name
                          )
                        }
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        title="Xóa hình ảnh"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <span className="absolute bottom-1 left-1 bg-green-600 text-white text-[10px] px-1 rounded">
                        Mới
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 4. Action Buttons */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="medium"
                  onClick={resetForm}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Khôi phục
                </Button>
                <Button
                  variant="primary"
                  size="medium"
                  type="submit"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? (
                    <Loading type="inline" text="Đang cập nhật..." />
                  ) : (
                    'Cập nhật loại sản phẩm'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      {previewModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closePreview}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-3 bg-gray-50 flex items-center justify-between border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">{previewModal.imageName}</h3>
              <button
                onClick={closePreview}
                className="w-8 h-8 rounded-lg hover:bg-gray-200 text-gray-600 transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image */}
            <div className="p-4 flex items-center justify-center bg-gray-100">
              <img
                src={previewModal.imageUrl}
                alt={previewModal.imageName}
                className="max-w-full max-h-[82vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProductTypePage;
