import { useState } from 'react';
import { useGetDetailCategoryByIdQuery } from '@/services/api/categoryApi';
import Loading from '@/components/ui/Loading';
import type { CategoryDetail } from './types/categoryDetail';


const DetailCategoryPage = () => {
  const { data, error, isLoading } = useGetDetailCategoryByIdQuery(1);
  const [selectedProductType, setSelectedProductType] = useState<number | null>(null);

  if (isLoading) return <Loading type="div" />;

  if (error) {
    let errorMessage = 'Unknown error occurred';
    if ('data' in error) {
      errorMessage = typeof error.data === 'string' ? error.data : JSON.stringify(error.data);
    } else if ('message' in error) {
      errorMessage = "Có lỗi xảy ra: ";
    }
    return <div className="p-4 text-red-600">Lỗi: {errorMessage}</div>;
  }

  if (!data?.data) {
    return <div className="p-4">Không có dữ liệu danh mục</div>;
  }

  const categoryData: CategoryDetail = data.data;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Category Header with Statistics */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex gap-6 mb-6">
          <img
            src={categoryData.image_url}
            alt={categoryData.category_name_vn}
            className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <h1 className="text-2xl font-bold">{categoryData.category_name_vn}</h1>
              <span
                className={`px-3 py-1 rounded text-sm font-medium ${
                  categoryData.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {categoryData.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-3">
              <div>
                <span className="text-gray-600">ID:</span>
                <span className="ml-2 font-medium">{categoryData.category_id}</span>
              </div>
              <div>
                <span className="text-gray-600">Ngày tạo:</span>
                <span className="ml-2">
                  {new Date(categoryData.created_at).toLocaleDateString('vi-VN')}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Cập nhật:</span>
                <span className="ml-2">
                  {new Date(categoryData.updated_at).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>
            <div
              className="prose prose-sm max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: categoryData.description_vn }}
            />
          </div>
        </div>

        {/* Statistics - Integrated in Category Card */}
        <p className="pt-6 border-t text-sm text-gray-800">
          Danh mục con:{' '}
          <span className="font-semibold text-blue-700">
            {categoryData.statistics.active_subcategories}/
            {categoryData.statistics.total_subcategories}
          </span>{' '}
          · Loại sản phẩm:{' '}
          <span className="font-semibold text-green-700">
            {categoryData.statistics.active_product_types}/
            {categoryData.statistics.total_product_types}
          </span>{' '}
          · Sản phẩm:{' '}
          <span className="font-semibold text-purple-700">
            {categoryData.statistics.active_products}/{categoryData.statistics.total_products}
          </span>
        </p>
      </div>

      {/* Subcategories */}
      {categoryData.subcategories.map(subcategory => (
        <div key={subcategory.subcategory_id} className="bg-white rounded-lg shadow p-6">
          {/* Subcategory Header */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b">
            <img
              src={subcategory.image_url}
              alt={subcategory.subcategory_name_vn}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold">{subcategory.subcategory_name_vn}</h3>
              <p className="text-sm text-gray-600">
                {subcategory.product_types.length} loại sản phẩm
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded text-sm font-medium ${
                subcategory.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {subcategory.status}
            </span>
          </div>

          {/* Product Types Grid - Compact */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {subcategory.product_types.map(productType => (
              <button
                key={productType.product_type_id}
                onClick={() =>
                  setSelectedProductType(
                    selectedProductType === productType.product_type_id
                      ? null
                      : productType.product_type_id
                  )
                }
                className={`group relative border-2 rounded-lg p-3 transition-all hover:shadow-md ${
                  selectedProductType === productType.product_type_id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {productType.image_url && (
                  <img
                    src={productType.image_url}
                    alt={productType.product_type_name_vn}
                    className="w-full h-20 object-cover rounded mb-2"
                  />
                )}
                <h5 className="font-medium text-sm text-center line-clamp-2 mb-1">
                  {productType.product_type_name_vn}
                </h5>
                <div className="flex items-center justify-center gap-2 text-xs">
                  <span
                    className={`px-2 py-0.5 rounded ${
                      productType.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {productType.status}
                  </span>
                  <span className="text-gray-600">
                    {productType.active_product_count}/{productType.product_count}
                  </span>
                </div>
                {selectedProductType === productType.product_type_id && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Products List - Only show for selected Product Type */}
          {selectedProductType && (
            <div className="mt-6 pt-6 border-t">
              {subcategory.product_types
                .filter(pt => pt.product_type_id === selectedProductType)
                .map(productType => (
                  <div key={productType.product_type_id}>
                    <h4 className="font-semibold text-lg mb-4">
                      Sản phẩm trong {productType.product_type_name_vn}
                    </h4>
                    {productType.products.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {productType.products.map(product => (
                          <div
                            key={product.product_id}
                            className="flex gap-3 items-center border rounded-lg p-3 hover:shadow-md transition-shadow"
                          >
                            <img
                              src={product.main_image}
                              alt={product.product_name_vn}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h6 className="font-medium text-sm line-clamp-2 mb-1">
                                {product.product_name_vn}
                              </h6>
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-xs ${
                                  product.status === 'visible'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {product.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        Không có sản phẩm trong loại này
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DetailCategoryPage;
