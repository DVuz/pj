import { CustomPagination } from '@/components/ui/custome/CustomPagination.tsx';
import Loading from '../../../components/ui/Loading';
import { useGetProductList } from '@/hooks/category/useGetProductList.tsx';
import { useProductParams } from '@/hooks/product/useProductParams.tsx';
import { useGetSubcategoryByIdQuery } from '@/services/api/subcategoryApi.ts';
import PriceFilter from './components/desktop/PriceFilter';
import ProductList from './components/desktop/ProductList';
import ProductTypeFilter from './components/desktop/ProductTypeFilter';
import SortOrder from './components/desktop/SortOrder';

const ProductListPage = () => {
  const { subcategory, filters } = useProductParams();
  const {
    data: subcategoryData,
    error: subcategoryError,
    isLoading: subcategoryLoading,
  } = useGetSubcategoryByIdQuery(subcategory.id);

  // Use product list hook
  const {
    products,
    isLoading: productsLoading,
    pagination,
    handlePageChange,
    handleLimitChange,
    handleSortChange,
    handleProductTypeChange,
    handlePriceRangeChange,
  } = useGetProductList();

  console.log('Subcategory Data:', subcategoryData?.data);
  console.log('Products Data:', products);

  if (subcategoryLoading) return <Loading type="hscreen" />;
  if (subcategoryError) return <div>Error loading subcategory data</div>;

  const subcategories = subcategoryData?.data;

  return (
    <div className="max-w-[1560px] min-h-screen mx-auto px-4 py-4">
      {/* Banner Section - Full width image */}
      <div className="mb-6 rounded-xl overflow-hidden">
        <img
          src={subcategories?.image_url}
          alt={subcategories?.subcategory_name_vn}
          className="w-full h-[150px] object-cover"
        />
      </div>

      {/* Title Section */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{subcategories?.subcategory_name_vn}</h1>
      </div>

      {/* Filter Section - Chọn theo tiêu chí */}
      <div className="mb-6 px-2">
        {/* All filters in one row */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
          {subcategories && (
            <ProductTypeFilter
              subcategories={subcategories}
              onProductTypeChange={handleProductTypeChange}
            />
          )}
          <div className="flex gap-4">
            <PriceFilter
              onPriceRangeChange={handlePriceRangeChange}
              initialMinPrice={filters.min_price}
              initialMaxPrice={filters.max_price}
            />
            <SortOrder
              onSortChange={handleSortChange}
              initialSortBy={filters.sort_by}
              initialSortOrder={filters.sort_order}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-lg p-4">
        <div className="text-sm text-gray-500 mb-6">
          <span className="font-medium text-gray-700">
            {subcategories?.categoriy?.category_name_vn}
          </span>
          <span className="mx-2">›</span>
          <span className="text-gray-600">{subcategories?.subcategory_name_vn}</span>
        </div>

        {/* Product List */}
        <ProductList products={products} loading={productsLoading} />

        {/* Pagination */}
        <div className="mt-8">
          <CustomPagination
            pagination={pagination}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            showInfo={true}
            limitOptions={[5, 10, 20, 50, 100]}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
