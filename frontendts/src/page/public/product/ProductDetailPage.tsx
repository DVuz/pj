import React from 'react';
import Loading from '../../../components/ui/Loading';
import { useProductDetailParams } from '../../../hooks/product/useProductDetailParams';
import { useGetProductByIdQuery } from '../../../services/api/productApi';
import ImageCarousel from './components/desktop/ImageCarousel';
import ProductInfo from './components/desktop/ProductInfo';
import RelatedProducts from './components/desktop/RelatedProducts';
import type { Product } from './type';

const ProductDetailPage: React.FC = () => {
  const { product: productParams } = useProductDetailParams();
  const productId = productParams.product_id;

  const {
    data: productData,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  if (isLoading) {
    return <Loading type="hscreen" />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h2>
          <p className="text-gray-600">Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    );
  }

  const product: Product | undefined = productData?.data;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không có dữ liệu</h2>
          <p className="text-gray-600">Không thể tải thông tin sản phẩm.</p>
        </div>
      </div>
    );
  }

  // Debug: Log số lượng ảnh
  console.log('Product images:', {
    main_image: product.main_image,
    sub_image_count: product.sub_image?.length || 0,
    total_images: (product.sub_image?.length || 0) + 1,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1560px] mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span className="hover:text-gray-700 cursor-pointer">Trang chủ</span>
          <span className="mx-2">›</span>
          <span className="hover:text-gray-700 cursor-pointer">{product.category_name_vn}</span>
          <span className="mx-2">›</span>
          <span className="hover:text-gray-700 cursor-pointer">{product.subcategory_name_vn}</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">{product.product_name_vn}</span>
        </nav>

        {/* Main Content - Two Column Layout */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Left Column - Image Carousel */}
            <div>
              <ImageCarousel
                mainImage={product.main_image}
                subImages={product.sub_image || []}
                productName={product.product_name_vn}
              />
            </div>

            {/* Right Column - Product Info */}
            <div>
              <ProductInfo product={product} />
            </div>
          </div>
        </div>

        {/* Related Products Section (Optional - can be added later) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm tương tự</h2>
          <div className="bg-white rounded-xl p-6">
            <RelatedProducts
              productTypeId={product.product_type_id}
              currentProductId={product.product_id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
