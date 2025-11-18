import { CustomPagination } from '@/components/ui/custome/CustomPagination.tsx';
import { useGetProductList } from '@/hooks/category/useGetProductList.tsx';
import { useProductParams } from '@/hooks/product/useProductParams.tsx';
import { useGetSubcategoryByIdQuery } from '@/services/api/subcategoryApi.ts';
import Loading from '../../../components/ui/Loading';
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1560px] mx-auto px-2 sm:px-4 py-2 sm:py-4">
        {/* Banner Section */}
        <div className="mb-3 sm:mb-6 rounded-lg sm:rounded-xl overflow-hidden">
          <img
            src={subcategories?.image_url}
            alt={subcategories?.subcategory_name_vn}
            className="w-full h-[120px] sm:h-[150px] md:h-[200px] object-cover"
          />
        </div>

        {/* Title Section */}
        <div className="mb-3 sm:mb-4 px-1 sm:px-0">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
            {subcategories?.subcategory_name_vn}
          </h1>
          {/* Breadcrumb - Mobile */}
          <div className="text-xs sm:text-sm text-gray-500 mt-2 flex items-center flex-wrap">
            <span className="font-medium text-gray-700">
              {subcategories?.categoriy?.category_name_vn}
            </span>
            <span className="mx-1 sm:mx-2">›</span>
            <span className="text-gray-600">{subcategories?.subcategory_name_vn}</span>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-3 sm:mb-6">
          {/* Product Type Filter - Full width on mobile */}
          {subcategories && (
            <div className="mb-3">
              <ProductTypeFilter
                subcategories={subcategories}
                onProductTypeChange={handleProductTypeChange}
              />
            </div>
          )}

          {/* Price and Sort Filters - Stack on mobile */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
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

        {/* Content Section */}
        <div className="bg-white rounded-lg p-2 sm:p-4">
          {/* Product List */}
          <ProductList products={products} loading={productsLoading} />

          {/* Pagination */}
          <div className="mt-4 sm:mt-8">
            <CustomPagination
              pagination={pagination}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
              showInfo={true}
              limitOptions={[10, 20, 50, 100]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
