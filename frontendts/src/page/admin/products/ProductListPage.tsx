import ProductFilterHeader from '@/components/admin/product/ProductFilterHeader';
import { ProductTable} from '@/components/admin/product/ProductTable';
import { CustomPagination } from '@/components/ui/custome/CustomPagination';
import { useGetProductListAdmin } from '@/hooks/product/useGetProductListAdmin';
import { Toaster } from 'react-hot-toast';

const ProductListPage = () => {
  const {
    products,
    isLoading,
    error,
    pagination,
    query,
    handlePageChange,
    handleLimitChange,
    handleStatusChange,
    handleSortChange,
    handleSearchChange,
    handleProductTypeChange,
    handlePriceRangeChange,
    handleClearFilters,
    refetch,
  } = useGetProductListAdmin();

  const currentSortValue = `${query.sort_by || 'created_at'}|${query.sort_order || 'DESC'}`;

  const handleDeleteSuccess = () => {
    // Refetch data sau khi xóa thành công
    refetch();
  };

  return (
    <div className="space-y-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

      {/* All-in-one Filter Header */}
      <ProductFilterHeader
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
        onProductTypeChange={handleProductTypeChange}
        onPriceRangeChange={handlePriceRangeChange}
        onClearFilters={handleClearFilters}
        currentStatus={(query.status as 'active' | 'inactive' | 'all') || 'all'}
        currentSort={currentSortValue}
        currentProductTypeId={query.product_type_id}
        currentMinPrice={query.min_price}
        currentMaxPrice={query.max_price}
      />

      {/* Error state */}
      {error && <div className="text-red-500 text-center py-4">Lỗi khi tải sản phẩm</div>}

      {/* Product Table */}
      <ProductTable data={products} isLoading={isLoading} onDeleteSuccess={handleDeleteSuccess} />

      {/* Pagination */}
      <CustomPagination
        pagination={pagination}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        showInfo={true}
        limitOptions={[10, 20, 50, 100]}
      />
    </div>
  );
};

export default ProductListPage;
