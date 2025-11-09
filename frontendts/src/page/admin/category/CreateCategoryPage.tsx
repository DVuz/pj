import React from 'react';
import { Toaster } from 'react-hot-toast';
import ImageUpload from '../../../components/admin/ImageUpload';
import Button from '../../../components/ui/custome/Button';
import Input from '../../../components/ui/custome/Input';
import Select from '../../../components/ui/custome/Select';
import Loading from '../../../components/ui/Loading';
import TiptapEditor from '../../../components/ui/TiptapEditor';
import { STATUS_OPTIONS } from '@/constants/categoryConstants.ts';
import { useCategoryForm } from '@/hooks/category/useCategoryForm.tsx';

const CreateCategoryPage: React.FC = () => {
  const {
    formData,
    errors,
    isLoading,
    imageUploadRef,
    handleInputChange,
    handleImageChange,
    handleSubmit,
    resetForm,
  } = useCategoryForm();

  return (
    <>
      <Toaster />

      <div className="p-2 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <Input
            label="Tên danh mục"
            type="text"
            name="categoryNameVn"
            placeholder="Nhập tên danh mục..."
            value={formData.categoryNameVn}
            onChange={handleInputChange}
            required
            error={errors.categoryNameVn}
            disabled={isLoading}
          />

          <TiptapEditor
            label="Mô tả danh mục"
            name="descriptionVn"
            value={formData.descriptionVn}
            onChange={handleInputChange}
            placeholder="Nhập mô tả chi tiết về danh mục..."
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
            options={STATUS_OPTIONS}
            placeholder="Chọn trạng thái..."
            required
            clearable
            error={errors.status}
            disabled={isLoading}
          />

          <ImageUpload
            ref={imageUploadRef}
            label="Hình ảnh danh mục"
            name="categoryImage"
            onChange={handleImageChange}
            required
            maxSize={5}
            error={errors.categoryImage}
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
              {isLoading ? <Loading type="inline" text="Đang tạo..." /> : 'Tạo danh mục'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategoryPage;
