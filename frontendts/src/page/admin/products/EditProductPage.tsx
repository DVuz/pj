import ImageUpload from '@/components/admin/ImageUpload.tsx';
import Button from '@/components/ui/custome/Button';
import Input from '@/components/ui/custome/Input';
import Select from '@/components/ui/custome/Select';
import Loading from '@/components/ui/Loading';
import TipTapEditor from '@/components/ui/TipTapEditor.tsx';
import { STATUS_OPTIONS } from '@/constants/productConstants.ts';
import { useProductEdit } from '@/hooks/product/useProductEdit';
import { useGetProductTypesQuery } from '@/services/api/productTypeApi.ts';
import type { ProductType } from '@/types/product-type.type';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ArrowLeft, X } from 'lucide-react';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const EditProductPage: React.FC = () => {
  const { productId } = useParams({ strict: false });
  const navigate = useNavigate();
  const [previewModal, setPreviewModal] = React.useState({
    isOpen: false,
    imageUrl: '',
    imageName: '',
  });

  const {
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
  } = useProductEdit(productId ? parseInt(productId as string) : 0);

  // Fetch danh sách product types
  const { data: productTypesData, isLoading: isLoadingProductTypes } = useGetProductTypesQuery({
    status: 'active',
    limit: 100,
  });

  const productTypeOptions = (productTypesData?.data?.product_types || []).map(
    (pt: ProductType) => ({
      value: pt.product_type_id.toString(),
      label: pt.product_type_name_vn,
    })
  );

  const handleBack = () => {
    navigate({ to: '/admin/products' });
  };

  const openPreview = (imageUrl: string, imageName: string) => {
    setPreviewModal({ isOpen: true, imageUrl, imageName });
  };

  const closePreview = () => {
    setPreviewModal({ isOpen: false, imageUrl: '', imageName: '' });
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading text="Đang tải thông tin sản phẩm..." />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-4 px-6">
      <Toaster />
      <div className="max-w-7xl mx-auto">
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
            <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa sản phẩm</h1>
            <p className="text-sm text-gray-600 mt-1">Cập nhật thông tin sản phẩm #{productId}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Main Grid: 2 columns layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* 1. Basic Information */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  1. Thông tin cơ bản
                </h2>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Mã sản phẩm"
                      type="text"
                      name="productCode"
                      placeholder="VD: SP001"
                      value={formData.productCode}
                      onChange={handleInputChange}
                      required
                      error={errors.productCode}
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
                      clearable
                      error={errors.status}
                      disabled={isLoading}
                    />
                  </div>

                  <Input
                    label="Tên sản phẩm"
                    type="text"
                    name="productNameVn"
                    placeholder="Nhập tên sản phẩm..."
                    value={formData.productNameVn}
                    onChange={handleInputChange}
                    required
                    error={errors.productNameVn}
                    disabled={isLoading}
                  />

                  <Select
                    label="Loại sản phẩm"
                    name="productTypeId"
                    value={formData.productTypeId}
                    onChange={handleInputChange}
                    options={productTypeOptions}
                    placeholder={isLoadingProductTypes ? 'Đang tải...' : 'Chọn loại sản phẩm...'}
                    required
                    clearable
                    error={errors.productTypeId}
                    disabled={isLoading || isLoadingProductTypes}
                  />
                </div>
              </div>

              {/* 2. Description */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  2. Mô tả sản phẩm
                </h2>

                <TipTapEditor
                  label=""
                  name="descriptionVn"
                  value={formData.descriptionVn}
                  onChange={handleInputChange}
                  placeholder="Nhập mô tả chi tiết về sản phẩm..."
                  height="220px"
                  error={errors.descriptionVn}
                  disabled={isLoading}
                />
              </div>

              {/* 3. Images */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  3. Hình ảnh sản phẩm
                </h2>

                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <ImageUpload
                      ref={mainImageUploadRef}
                      label="Hình ảnh chính"
                      name="mainImage"
                      onChange={handleMainImageChange}
                      required
                      maxSize={5}
                      error={errors.mainImage}
                      disabled={isLoading}
                      preview={false}
                    />
                    {formData.mainImage &&
                      !formData.mainImageFile &&
                      !formData.replaceMainImage && (
                        <div className="mt-2 relative">
                          <p className="text-xs text-gray-600 mb-1">Hình ảnh hiện tại:</p>
                          <div className="relative inline-block group">
                            <img
                              src={formData.mainImage}
                              alt="Current main"
                              className="w-32 h-32 object-cover rounded border cursor-pointer hover:opacity-75 transition-opacity"
                              onClick={() => openPreview(formData.mainImage, 'Hình ảnh chính')}
                            />
                            <button
                              type="button"
                              onClick={handleRemoveMainImage}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                              title="Xóa hình ảnh"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <ImageUpload
                      ref={subImagesUploadRef}
                      label="Hình ảnh phụ"
                      name="subImages"
                      onChange={handleSubImagesChange}
                      multiple
                      maxSize={5}
                      error={errors.subImages}
                      disabled={isLoading}
                      preview={false}
                    />

                    {/* Display existing sub images */}
                    {formData.subImages && formData.subImages.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-gray-700 mb-2">
                          Hình ảnh hiện có ({formData.subImages.length}):
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          {formData.subImages.map((imgUrl, index) => (
                            <div key={`old-${index}`} className="relative group">
                              <img
                                src={imgUrl}
                                alt={`Existing ${index + 1}`}
                                className="w-full h-20 object-cover rounded border border-gray-300 cursor-pointer hover:opacity-75 transition-opacity"
                                onClick={() => openPreview(imgUrl, `Hình ảnh phụ ${index + 1}`)}
                              />
                              <button
                                type="button"
                                onClick={e => {
                                  e.stopPropagation();
                                  handleRemoveSubImage(imgUrl);
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 shadow-md z-10"
                                title="Xóa hình ảnh này"
                              >
                                <X className="h-3 w-3" />
                              </button>
                              <span className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-[10px] px-1 rounded">
                                Cũ
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Display newly added sub images */}
                    {formData.subImagesFiles && formData.subImagesFiles.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-green-700 mb-2">
                          Hình ảnh mới thêm ({formData.subImagesFiles.length}):
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          {formData.subImagesFiles.map((file, index) => {
                            const previewUrl = URL.createObjectURL(file);
                            return (
                              <div key={`new-${index}`} className="relative group">
                                <img
                                  src={previewUrl}
                                  alt={`New ${index + 1}`}
                                  className="w-full h-20 object-cover rounded border-2 border-green-300 cursor-pointer hover:opacity-75 transition-opacity"
                                  onClick={() => openPreview(previewUrl, file.name)}
                                />
                                <button
                                  type="button"
                                  onClick={e => {
                                    e.stopPropagation();
                                    handleRemoveNewSubImage(index);
                                  }}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 shadow-md z-10"
                                  title="Xóa hình ảnh mới này"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                                <span className="absolute bottom-1 left-1 bg-green-600 text-white text-[10px] px-1 rounded">
                                  Mới
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Summary */}
                    {((formData.subImages && formData.subImages.length > 0) ||
                      (formData.subImagesFiles && formData.subImagesFiles.length > 0) ||
                      (formData.deletedSubImages && formData.deletedSubImages.length > 0)) && (
                      <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs space-y-1">
                        <p className="font-semibold text-blue-800">Tóm tắt thay đổi:</p>
                        <div className="grid grid-cols-3 gap-2 text-gray-700">
                          <div>
                            <span className="font-medium">Giữ lại:</span>{' '}
                            <span className="text-green-600 font-semibold">
                              {formData.subImages?.length || 0}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Xóa:</span>{' '}
                            <span className="text-red-600 font-semibold">
                              {formData.deletedSubImages?.length || 0}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Thêm mới:</span>{' '}
                            <span className="text-blue-600 font-semibold">
                              {formData.subImagesFiles?.length || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* 4. Product Details */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  4. Chi tiết sản phẩm
                </h2>

                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <Input
                      label="Dài (cm)"
                      type="number"
                      name="length"
                      placeholder="0"
                      value={formData.length}
                      onChange={handleInputChange}
                      error={errors.length}
                      disabled={isLoading}
                    />

                    <Input
                      label="Rộng (cm)"
                      type="number"
                      name="width"
                      placeholder="0"
                      value={formData.width}
                      onChange={handleInputChange}
                      error={errors.width}
                      disabled={isLoading}
                    />

                    <Input
                      label="Cao (cm)"
                      type="number"
                      name="height"
                      placeholder="0"
                      value={formData.height}
                      onChange={handleInputChange}
                      error={errors.height}
                      disabled={isLoading}
                    />
                  </div>

                  <Input
                    label="Chất liệu"
                    type="text"
                    name="materialVn"
                    placeholder="VD: Gỗ tự nhiên"
                    value={formData.materialVn}
                    onChange={handleInputChange}
                    error={errors.materialVn}
                    disabled={isLoading}
                  />

                  <Input
                    label="Xuất xứ"
                    type="text"
                    name="originVn"
                    placeholder="VD: Việt Nam"
                    value={formData.originVn}
                    onChange={handleInputChange}
                    error={errors.originVn}
                    disabled={isLoading}
                  />

                  <Input
                    label="Màu sắc"
                    type="text"
                    name="colorVn"
                    placeholder="VD: Nâu gỗ"
                    value={formData.colorVn}
                    onChange={handleInputChange}
                    error={errors.colorVn}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* 5. Pricing & Warranty */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  5. Giá và bảo hành
                </h2>

                <div className="space-y-3">
                  <Input
                    label="Giá (VNĐ)"
                    type="number"
                    name="price"
                    placeholder="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    error={errors.price}
                    disabled={isLoading}
                  />

                  <Input
                    label="Thời gian bảo hành (tháng)"
                    type="number"
                    name="warrantyPeriod"
                    placeholder="12"
                    value={formData.warrantyPeriod}
                    onChange={handleInputChange}
                    required
                    error={errors.warrantyPeriod}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* 6. Action Buttons */}
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
                      'Cập nhật sản phẩm'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      {previewModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-9999"
          onClick={closePreview}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-700">{previewModal.imageName}</h3>
              <button
                onClick={closePreview}
                className="p-1 rounded-md hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Image */}
            <div className="p-5 flex items-center justify-center">
              <img
                src={previewModal.imageUrl}
                alt={previewModal.imageName}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProductPage;
