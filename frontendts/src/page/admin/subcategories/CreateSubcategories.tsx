
import { Toaster } from 'react-hot-toast';
import ImageUpload from '@/components/admin/ImageUpload';
import Button from '@/components/ui/custome/Button';
import Input from '@/components/ui/custome/Input';
import Select from '@/components/ui/custome/Select';
import Loading from '@/components/ui/Loading';
import TiptapEditor from '@/components/ui/TiptapEditor';
import { SET_ACTIVE_OPTIONS } from '@/constants/common';
import type { Categories } from '@/types/category.type';
import { useGetCategoriesQuery } from '../../../services/api/categoryApi';
import { useCreateSubcategory } from '@/hooks/subcategory/useCreateSubcategory';

const CreateSubcategories = () => {
  const { data, error, isLoading: loadingCategories } = useGetCategoriesQuery({});
  const categoriesData = data?.data?.categories;

  const {
    formData,
    errors,
    isLoading,
    imageUploadRef,
    handleInputChange,
    handleImageChange,
    handleSubmit,
    resetForm,
  } = useCreateSubcategory();

  // Tạo options cho Select category
  const categoryOptions =
    categoriesData?.map((category: Categories) => ({
      value: category.category_id.toString(),
      label: category.category_name_vn,
    })) || [];

  console.log('Categories Data:', categoriesData);

  // Hiển thị loading
  if (loadingCategories) {
    return <Loading type="div" text="Đang tải danh mục..." />;
  }

  // Hiển thị lỗi
  if (error) {
    return (
      <div className="bg-white p-4 rounded-md border shadow-md max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center p-6 min-h-[400px]">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-600 mb-2">Có lỗi xảy ra</h2>
          <p className="text-gray-600 text-center mb-4">
            Không thể tải danh mục. Vui lòng thử lại sau.
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
        <h1 className="text-2xl font-bold mb-6">Tạo danh mục con</h1>

        <form onSubmit={handleSubmit}>
          <Select
            label="Chọn danh mục cấp cha"
            name="categoryId"
            value={formData.categoryId.toString()}
            onChange={handleInputChange}
            options={categoryOptions}
            placeholder="Chọn danh mục cấp cha..."
            required
            clearable
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

          <TiptapEditor
            label="Mô tả danh mục con"
            name="descriptionVn"
            value={formData.descriptionVn}
            onChange={handleInputChange}
            placeholder="Nhập mô tả chi tiết về danh mục con..."
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
            label="Ảnh danh mục con"
            name="subcategoryImage"
            onChange={handleImageChange}
            required
            maxSize={5}
            error={errors.subcategoryImage}
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
              {isLoading ? <Loading type="inline" text="Đang tạo..." /> : 'Tạo danh mục con'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateSubcategories;
