import { selectIsFavorite, toggleFavorite } from '@/slices/favoriteProductSlice';
import { createSlug } from '@/utils/productUrl';
import { Heart } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import type {Product} from '@/types/common.types.ts';


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(product.product_id));

  const handleOpenProductDetailPage = (product: Product) => {
    const productSlug = createSlug(product.product_name_vn);
    const url = `/product/${productSlug}-${product.product_id}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      toggleFavorite({
        product_id: product.product_id,
        product_name_vn: product.product_name_vn,
        price: product.price,
        main_image: product.main_image,
        product_type_name_vn: product.product_type_name_vn,
        material_vn: product.material_vn,
        color_vn: product.color_vn,
        addedAt: new Date().toISOString(),
      })
    );
    if (isFavorite) {
      toast.success('Đã xóa khỏi danh sách yêu thích');
    } else {
      toast.success('Đã thêm vào danh sách yêu thích');
    }
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden w-full group">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.main_image}
          alt={product.product_name_vn}
          className="w-full h-[150px] sm:h-[180px] md:h-[200px] object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
          onClick={() => handleOpenProductDetailPage(product)}
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
            isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-white hover:bg-gray-100'
          }`}
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all ${
              isFavorite ? 'text-white fill-white' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Product Type Tag */}
        <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-linear-to-r from-green-500 to-green-600 text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md">
          {product.product_type_name_vn}
        </span>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3 md:p-4">
        {/* Product Name */}
        <h3
          className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight mb-1 sm:mb-2 line-clamp-2 cursor-pointer hover:text-green-600 transition-colors min-h-8 sm:min-h-10"
          onClick={() => handleOpenProductDetailPage(product)}
        >
          {product.product_name_vn}
        </h3>

        {/* Material and Color */}
        <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-gray-300 shadow-sm"
            style={{ backgroundColor: product.color_vn }}
            title={product.color_vn}
          />
          <span className="text-[10px] sm:text-xs text-gray-600 truncate flex-1">
            {product.material_vn}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Giá</span>
            <span className="text-sm sm:text-base md:text-lg font-bold text-red-600">
              {product.price.toLocaleString('vi-VN')}₫
            </span>
          </div>
          <button
            onClick={() => handleOpenProductDetailPage(product)}
            className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-[10px] sm:text-xs md:text-sm font-medium rounded-md sm:rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
