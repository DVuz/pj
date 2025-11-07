import { useEffect } from 'react';
import { CustomPagination } from '@/components/ui/custome/CustomPagination';
import { useGetSubcategory } from '@/hooks/subcategory/useGetSubcategory.ts';
import FilterSubcategory from '@/components/admin/subcategory/FilterSubcategory';
import SubcategoryTable from '@/components/admin/subcategory/SubcategoryTable';

const SubcategoryListPage = () => {
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
    handleCategoryChange,
    handleRefreshQuery,
  } = useGetSubcategory();

  useEffect(() => {
    console.log('Data 12:', data);
  }, [data]);

  // Các hàm xử lý thao tác
  const handleViewDetails = (id: number) => {
    console.log('View details for:', id);
    // Implement view logic
  };

  const handleEdit = (id: number) => {
    console.log('Edit subcategory:', id);
    // Implement edit logic
  };

  const handleDelete = (id: number) => {
    console.log('Delete subcategory:', id);
    // Implement delete logic
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý danh mục con</h1>

      {/* Bộ lọc */}
      <FilterSubcategory
        query={query}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
        onRefreshFilters={handleRefreshQuery}
      />

      {/* Thông báo lỗi */}
      {error && <div className="text-red-500 text-center py-4">Lỗi khi tải danh mục con</div>}

      {/* Bảng danh mục con */}
      <SubcategoryTable
        data={data || []}
        isLoading={isLoading}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Phân trang */}
      <CustomPagination
        pagination={pagination}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        showInfo={true}
        limitOptions={[5, 10, 20, 50, 100]}
      />
    </div>
  );
};

export default SubcategoryListPage;
