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
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const EditProductPage: React.FC = () => {
  const { productId } = useParams({ strict: false });
  const navigate = useNavigate();

  const {
    formData,
    errors,
    isLoading,
    isFetching,
    mainImageUploadRef,
    subImagesUploadRef,
    handleInputChange,
    handleMainImageChange,
    handleSubImagesChange,
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
                    />
                    {formData.mainImage && !formData.mainImageFile && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 mb-1">Hình ảnh hiện tại:</p>
                        <img
                          src={formData.mainImage}
                          alt="Current main"
                          className="w-32 h-32 object-cover rounded border"
                        />
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
                    />
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
    </div>
  );
};

export default EditProductPage;
