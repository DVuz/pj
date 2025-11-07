import { useEffect } from 'react';
import { CustomPagination } from '@/components/ui/custome/CustomPagination';
import { useGetProductTypes } from '@/hooks/product-type/useGetProductType';
import FilterPTHeader from '@/components/admin/product-type/FilterPTHeader';
import ProductTypeTable from '@/components/admin/product-type/ProductTypeTable';

const ProductTypeListPage = () => {
  const {
    query,
    pagination,
    productTypes,
    isLoading,
    error,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
    handleStatusChange,
    handleSortChange,
    handleSubcategoryChange,
    handleRefreshQuery,
  } = useGetProductTypes();

  useEffect(() => {
    console.log('Product Types Data:', productTypes);
  }, [productTypes]);

  // Các hàm xử lý thao tác
  const handleViewDetails = (id: number) => {
    console.log('View details for product type:', id);
    // Implement view logic
  };

  const handleEdit = (id: number) => {
    console.log('Edit product type:', id);
    // Implement edit logic
  };

  const handleDelete = (id: number) => {
    console.log('Delete product type:', id);
    // Implement delete logic
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý loại sản phẩm</h1>

      {/* Bộ lọc */}
      <FilterPTHeader
        query={query}
        onSearchChange={handleSearchChange}
        onSubcategoryChange={handleSubcategoryChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
        onRefreshFilters={handleRefreshQuery}
      />

      {/* Thông báo lỗi */}
      {error && <div className="text-red-500 text-center py-4">Lỗi khi tải loại sản phẩm</div>}

      {/* Bảng loại sản phẩm */}
      <ProductTypeTable
        data={productTypes}
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

export default ProductTypeListPage;
