import ImageUpload from '@/components/admin/ImageUpload';
import Button from '@/components/ui/custome/Button';
import Input from '@/components/ui/custome/Input';
import Select from '@/components/ui/custome/Select';
import Loading from '@/components/ui/Loading';
import TipTapEditor from '@/components/ui/TipTapEditor';
import { SET_ACTIVE_OPTIONS } from '@/constants/productTypeConstants';
import { useCreateProductType } from '@/hooks/productType/useCreateProductType';
import { useGetSubcategoriesQuery } from '@/services/api/subcategoryApi';
import type { Subcategory } from '@/types/subcategory.type';
import { Toaster } from 'react-hot-toast';

const CreatePTPage = () => {
  const { data, error, isLoading: loadingSubcategories } = useGetSubcategoriesQuery({});
  const subcategoriesData = data?.data?.subcategories;

  const {
    formData,
    errors,
    isLoading,
    imageUploadRef,
    handleInputChange,
    handleImageChange,
    handleSubmit,
    resetForm,
  } = useCreateProductType();

  const subcategoryOptions =
    subcategoriesData?.map((subcategory: Subcategory) => ({
      value: subcategory.subcategory_id.toString(),
      label: subcategory.subcategory_name_vn,
    })) || [];

  if (loadingSubcategories) {
    return <Loading type="div" text="Đang tải loại sản phẩm..." />;
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-md border shadow-md max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center p-6 min-h-[400px]">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-600 mb-2">Có lỗi xảy ra</h2>
          <p className="text-gray-600 text-center mb-4">
            Không thể tải loại sản phẩm. Vui lòng thử lại sau.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />

      <div className="p-2 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Tạo loại sản phẩm mới</h1>

        <form onSubmit={handleSubmit}>
          <Select
            label="Danh mục con"
            name="subcategoryId"
            value={formData.subcategoryId.toString()}
            onChange={handleInputChange}
            options={subcategoryOptions}
            placeholder="Chọn danh mục con..."
            required
            clearable
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

          <TipTapEditor
            label="Mô tả loại sản phẩm"
            name="descriptionVn"
            value={formData.descriptionVn}
            onChange={handleInputChange}
            placeholder="Nhập mô tả chi tiết về loại sản phẩm..."
            height="250px"
            required
            error={errors.descriptionVn}
            disabled={isLoading}
          />

          <Select
            label="Trạng thái"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            options={SET_ACTIVE_OPTIONS}
            placeholder="Chọn trạng thái..."
            required
            clearable
            error={errors.status}
            disabled={isLoading}
          />

          <ImageUpload
            ref={imageUploadRef}
            label="Hình ảnh loại sản phẩm"
            name="productTypeImage"
            onChange={handleImageChange}
            required
            maxSize={5}
            error={errors.productTypeImage}
            disabled={isLoading}
          />

          <div className="mt-6 flex gap-4 justify-end">
            <Button
              type="button"
              variant="secondary"
              size="large"
              onClick={resetForm}
              disabled={isLoading}
            >
              Làm mới
            </Button>
            <Button variant="primary" size="large" type="submit" disabled={isLoading}>
              {isLoading ? <Loading type="inline" text="Đang tạo..." /> : 'Tạo loại sản phẩm'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePTPage;
