import React from 'react';
import ProductCard from './ProductCard';

// Use the Product interface from the hook to match the API response
interface Product {
  product_id: number;
  product_name_vn: string;
  description_vn: string;
  price: number;
  category_id: number;
  subcategory_id: number;
  product_type_id: number;
  main_image: string;
  material_vn: string;
  color_vn: string;
  product_type_name_vn: string;
}

interface ProductListProps {
  products: Product[];
  loading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products = [], loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-full max-w-[280px] h-80 sm:h-[380px] bg-gray-100 rounded-2xl animate-pulse mx-auto"
          >
            <div className="w-full h-[150px] sm:h-[200px] bg-gray-200 rounded-t-2xl mb-3 sm:mb-4"></div>
            <div className="px-3 sm:px-4 space-y-2 sm:space-y-3">
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 sm:h-5 bg-gray-200 rounded w-2/3"></div>
              <div className="h-8 sm:h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Không tìm thấy sản phẩm</h3>
        <p className="text-gray-500 text-center">
          Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem thêm sản phẩm khác
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-6">
      {products.map(product => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
