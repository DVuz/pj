import ImageUpload from '@/components/admin/ImageUpload.tsx';
import Button from '@/components/ui/custome/Button';
import Input from '@/components/ui/custome/Input';
import Select from '@/components/ui/custome/Select';
import Textarea from '@/components/ui/custome/Textarea';
import Loading from '@/components/ui/Loading';
import { STATUS_OPTIONS } from '@/constants/categoryConstants.ts';
import { useSubcategoryEdit } from '@/hooks/subcategory/useSubcategoryEdit';
import { useGetCategoriesQuery } from '@/services/api/categoryApi';
import type { Category } from '@/types/category.type';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ArrowLeft, X } from 'lucide-react';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const EditSubcategoryPage: React.FC = () => {
  const { subcategoryId } = useParams({ strict: false });
  console.log('Editing subcategory ID:', subcategoryId);
  const navigate = useNavigate();
  const [previewModal, setPreviewModal] = React.useState({
    isOpen: false,
    imageUrl: '',
    imageName: '',
  });

  // Fetch categories for select
  const { data: categoriesData, isLoading: loadingCategories } = useGetCategoriesQuery({});
  const categoryOptions =
    categoriesData?.data?.categories?.map((category: Category) => ({
      value: category.category_id.toString(),
      label: category.category_name_vn,
    })) || [];
  console.log('Fetched categories for select:', categoryOptions);

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
  } = useSubcategoryEdit(subcategoryId ? parseInt(subcategoryId as string) : 0);

  console.log('Category options:', categoryOptions);
  console.log('Current categoryId from formData:', formData.categoryId);

  const handleBack = () => {
    navigate({ to: '/admin/subcategories/list' });
  };

  const openPreview = (imageUrl: string, imageName: string) => {
    setPreviewModal({ isOpen: true, imageUrl, imageName });
  };

  const closePreview = () => {
    setPreviewModal({ isOpen: false, imageUrl: '', imageName: '' });
  };

  if (isFetching || loadingCategories) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading text="Đang tải thông tin danh mục con..." />
      </div>
    );
  }

  // Đảm bảo có dữ liệu trước khi render form
  if (!formData.subcategoryNameVn && subcategoryId) {
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
            <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa danh mục con</h1>
            <p className="text-sm text-gray-600 mt-1">
              Cập nhật thông tin danh mục con #{subcategoryId}
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
                  label="Danh mục cha"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  options={categoryOptions}
                  placeholder="Chọn danh mục cha..."
                  required
                  error={errors.categoryId}
                  disabled={isLoading || loadingCategories}
                />

                <Input
                  label="Tên danh mục con"
                  type="text"
                  name="subcategoryNameVn"
                  placeholder="Nhập tên danh mục con..."
                  value={formData.subcategoryNameVn}
                  onChange={handleInputChange}
                  required
                  error={errors.subcategoryNameVn}
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
                2. Mô tả danh mục con
              </h2>

              <Textarea
                label=""
                name="descriptionVn"
                value={formData.descriptionVn}
                onChange={handleInputChange}
                placeholder="Nhập mô tả chi tiết về danh mục con..."
                height="200px"
                required
                error={errors.descriptionVn}
                disabled={isLoading}
              />
            </div>

            {/* 3. Image */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                3. Hình ảnh danh mục con
              </h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <ImageUpload
                  ref={imageUploadRef}
                  label="Hình ảnh danh mục con"
                  name="subcategoryImage"
                  onChange={handleImageChange}
                  required
                  maxSize={5}
                  error={errors.subcategoryImage}
                  disabled={isLoading}
                  preview={false}
                />

                {/* Hiển thị ảnh hiện tại (nếu chưa thay thế) */}
                {formData.subcategoryImage &&
                  !formData.subcategoryImageFile &&
                  !formData.replaceSubcategoryImage && (
                    <div className="mt-2 relative">
                      <p className="text-xs text-gray-600 mb-1">Hình ảnh hiện tại:</p>
                      <div className="relative inline-block group">
                        <img
                          src={formData.subcategoryImage}
                          alt="Current subcategory"
                          className="w-32 h-32 object-cover rounded border cursor-pointer hover:opacity-75 transition-opacity"
                          onClick={() =>
                            openPreview(formData.subcategoryImage, 'Hình ảnh danh mục con')
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
                {formData.subcategoryImageFile && (
                  <div className="mt-2 relative">
                    <p className="text-xs text-green-700 font-semibold mb-1">Hình ảnh mới:</p>
                    <div className="relative inline-block group">
                      <img
                        src={URL.createObjectURL(formData.subcategoryImageFile)}
                        alt="New subcategory"
                        className="w-32 h-32 object-cover rounded border-2 border-green-300 cursor-pointer hover:opacity-75 transition-opacity"
                        onClick={() =>
                          openPreview(
                            URL.createObjectURL(formData.subcategoryImageFile!),
                            formData.subcategoryImageFile!.name
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
                    'Cập nhật danh mục con'
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

export default EditSubcategoryPage;
