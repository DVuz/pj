import { removeFromFavorites, selectFavoriteProducts } from '@/slices/favoriteProductSlice';
import { createSlug } from '@/utils/productUrl';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const FavoriteProductsPage = () => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(selectFavoriteProducts);

  const handleRemoveFavorite = (productId: number, productName: string) => {
    dispatch(removeFromFavorites(productId));
    toast.success(`Đã xóa "${productName}" khỏi danh sách yêu thích`);
  };

  const handleViewProduct = (productId: number, productName: string) => {
    const productSlug = createSlug(productName);
    const url = `/product/${productSlug}-${productId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Danh sách yêu thích trống</h2>
            <p className="text-gray-600 mb-6">Bạn chưa thêm sản phẩm nào vào danh sách yêu thích</p>
            <a
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Khám phá sản phẩm
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-3xl font-bold text-gray-900">Sản phẩm yêu thích</h1>
          </div>
          <p className="text-gray-600">
            Bạn có <span className="font-semibold text-green-600">{favoriteProducts.length}</span>{' '}
            sản phẩm trong danh sách yêu thích
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {favoriteProducts.map(product => (
            <div
              key={product.product_id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.main_image}
                  alt={product.product_name_vn}
                  className="w-full h-[200px] object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                  onClick={() => handleViewProduct(product.product_id, product.product_name_vn)}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFavorite(product.product_id, product.product_name_vn)}
                  className="absolute top-3 right-3 w-9 h-9 bg-white hover:bg-red-50 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group/btn"
                  title="Xóa khỏi yêu thích"
                >
                  <Trash2 className="w-5 h-5 text-gray-600 group-hover/btn:text-red-600" />
                </button>

                {/* Product Type Tag */}
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                  {product.product_type_name_vn}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Product Name */}
                <h3
                  className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2 cursor-pointer hover:text-green-600 transition-colors h-10"
                  onClick={() => handleViewProduct(product.product_id, product.product_name_vn)}
                >
                  {product.product_name_vn}
                </h3>

                {/* Material and Color */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-gray-300 shadow-sm"
                    style={{ backgroundColor: product.color_vn }}
                    title={product.color_vn}
                  />
                  <span className="text-xs text-gray-600 truncate flex-1">
                    {product.material_vn}
                  </span>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-0.5">Giá</span>
                    <span className="text-lg font-bold text-red-600">
                      {product.price.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                  <button
                    onClick={() => handleViewProduct(product.product_id, product.product_name_vn)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteProductsPage;
