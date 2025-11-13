import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef } from 'react';
import Loading from '../../../../../components/ui/Loading';
import { useGetProductsQuery } from '../../../../../services/api/productApi';
import ProductCard from './ProductCard';

interface Product {
  product_id: number;
  product_name_vn: string
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

interface RelatedProductsProps {
  productTypeId: number;
  currentProductId: number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ productTypeId, currentProductId }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useGetProductsQuery({
    product_type_id: productTypeId,
    status: 'active',
    limit: 12, // Tăng lên 12 để có nhiều sản phẩm scroll
  });

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Scroll 300px mỗi lần
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loading type="div" text="Đang tải sản phẩm tương tự..." />
      </div>
    );
  }

  if (error || !data?.data?.products) {
    return <div className="text-center py-8 text-gray-500">Không thể tải sản phẩm tương tự</div>;
  }

  // Lọc bỏ sản phẩm hiện tại khỏi danh sách
  const relatedProducts = (data.data.products as Product[]).filter(
    (product: Product) => product.product_id !== currentProductId
  );

  if (relatedProducts.length === 0) {
    return <div className="text-center py-8 text-gray-500">Không có sản phẩm tương tự</div>;
  }

  return (
    <div className="relative group">
      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {relatedProducts.map((product: Product) => (
          <div key={product.product_id} className="shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {relatedProducts.length > 4 && (
        <>
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-gray-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-gray-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        </>
      )}
    </div>
  );
};

export default RelatedProducts;
