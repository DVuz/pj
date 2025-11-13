import { createSlug } from '@/utils/productUrl';
import { Check, Heart, ShoppingCart } from 'lucide-react';
import React from 'react';

// Define Product interface matching the hook's Product interface
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

interface ProductCardProps {
  product: Product;
  inCart?: boolean;
  cartCount?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, inCart, cartCount }) => {
  const handleOpenProductDetailPage = (product: Product) => {
    const productSlug = createSlug(product.product_name_vn);
    const url = `/product/${productSlug}-${product.product_id}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full max-w-[280px]">
      {/* Image Container */}
      <div className="relative group">
        <img
          src={product.main_image}
          alt={product.product_name_vn}
          className="w-full h-[150px] sm:h-[200px] object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => handleOpenProductDetailPage(product)}
        />

        {/* Top Actions */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1 sm:gap-2">
          <button className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hover:text-red-500" />
          </button>
          <button className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </button>
        </div>

        {/* Tag - hiển thị material */}
        <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-green-100 text-green-700 text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md ">
          {product.product_type_name_vn}
        </span>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Product Name */}
        <h3
          className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight mb-1 sm:mb-2 line-clamp-2 cursor-pointer"
          onClick={() => handleOpenProductDetailPage(product)}
        >
          {product.product_name_vn}
        </h3>

        {/* Color and Description */}
        <div className="flex items-center gap-1 mb-1 sm:mb-2 justify-between">
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: product.color_vn }}
          />
          <span className="text-xs text-gray-500 truncate">{product.material_vn}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="text-sm sm:text-lg font-bold text-red-600">
            {product.price.toLocaleString('vi-VN')} VNĐ
          </span>
          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
        </div>

        {/* Cart Status or Add to Cart Button */}
        {inCart ? (
          <button
            type="button"
            className="w-full bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3 text-center hover:bg-green-100 transition-colors duration-150 flex items-center justify-between"
          >
            <div className="flex items-center gap-1 sm:gap-2 text-green-700 text-xs sm:text-sm font-medium">
              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Đã có ({cartCount || 1})</span>
            </div>
            <span className="text-green-700 text-xs underline hover:text-green-800">Xem</span>
          </button>
        ) : (
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-2 sm:px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2">
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">Thêm vào giỏ</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
