import { useEffect } from 'react';
import { CustomPagination } from '@/components/ui/custome/CustomPagination';
import FilterHeader from '@/components/admin/category/FilterHeader';
import { useGetCategory } from '@/hooks/category/useGetCategory';
import { CategoryTable } from '@/components/admin/category/CategoryTable';
// import { useToast } from '@/components/ui/use-toast';

export default function CategoryTest() {
  // const { toast } = useToast();

  const {
    query,
    pagination,
    data,
    isLoading,
    error,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
    handleStatusChange,
    handleSortChange,
  } = useGetCategory();

  // Additional logging in the component
  useEffect(() => {
    console.log('Data', data);
    if (data && data.length > 0) {
      console.log('Categories loaded:', data.length);
      console.log('First category:', data[0]);
    }
  }, [data]);

  // Các hàm xử lý thao tác
  const handleViewDetails = () => {
    // Thêm logic xem chi tiết tại đây
  };

  const handleEdit = () => {
    // Thêm logic chỉnh sửa tại đây
  };

  const handleDelete = () => {
    // Thêm logic xóa tại đây
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý danh mục</h1>

      {/* Filter Header with props */}
      <FilterHeader
        query={query}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
      />

      {/* Error state */}
      {error && <div className="text-red-500 text-center py-4">Lỗi khi tải danh mục</div>}

      {/* Bảng danh mục */}
      <CategoryTable
        data={data}
        isLoading={isLoading}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CustomPagination
        pagination={pagination}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        showInfo={true}
        limitOptions={[5, 10, 20, 50, 100]}
      />
    </div>
  );
}
