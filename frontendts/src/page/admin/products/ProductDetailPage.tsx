import Button from '@/components/ui/custome/Button';
import Loading from '@/components/ui/Loading';
import { useGetProductByIdQuery } from '@/services/api/productApi';
import { useNavigate, useParams } from '@tanstack/react-router';
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Edit,
  Image as ImageIcon,
  MapPin,
  Package,
  Palette,
  Ruler,
  Shield,
  Tags,
  X,
} from 'lucide-react';
import React from 'react';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams({ strict: false });
  const navigate = useNavigate();
  const [previewModal, setPreviewModal] = React.useState({
    isOpen: false,
    imageUrl: '',
    imageName: '',
  });
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const { data, isLoading, isFetching } = useGetProductByIdQuery(
    productId ? parseInt(productId as string) : 0,
    {
      skip: !productId,
    }
  );

  const product = data?.data;

  const handleBack = () => {
    navigate({ to: '/admin/products' });
  };

  const handleEdit = () => {
    navigate({ to: `/admin/products/edit/${productId}` });
  };

  const openPreview = (imageUrl: string, imageName: string) => {
    setPreviewModal({ isOpen: true, imageUrl, imageName });
  };

  const closePreview = () => {
    setPreviewModal({ isOpen: false, imageUrl: '', imageName: '' });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <Loading text="Đang tải thông tin sản phẩm..." />
          <p className="mt-4 text-gray-500 text-sm">Vui lòng chờ trong giây lát...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center border border-gray-200">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium mb-6">Không tìm thấy sản phẩm</p>
          <Button variant="primary" onClick={handleBack} className="px-8 py-3">
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

  // Parse sub_image safely
  let subImages: string[] = [];
  if (product.sub_image) {
    try {
      if (typeof product.sub_image === 'string') {
        subImages = JSON.parse(product.sub_image);
      } else if (Array.isArray(product.sub_image)) {
        subImages = product.sub_image;
      }
    } catch (error) {
      console.error('Error parsing sub_image:', error);
      subImages = [];
    }
  }

  // Combine main image and sub images for carousel
  const allImages = product.main_image ? [product.main_image, ...subImages] : subImages;

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + allImages.length) % allImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow mb-6 p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>

              {product.main_image && (
                <img
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  src={product.main_image}
                  alt={product.product_name_vn}
                />
              )}

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.product_name_vn}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="px-2 py-1 bg-gray-100 rounded font-medium">
                    {product.product_code}
                  </span>
                  <span>•</span>
                  <span>{product.category_name_vn || 'Chưa phân loại'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleEdit}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Chỉnh sửa
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2">Giá bán lẻ</p>
                <p className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2">Bảo hành</p>
                <div className="flex items-baseline gap-1.5">
                  <p className="text-2xl font-bold text-gray-900">{product.warranty_period}</p>
                  <p className="text-sm text-gray-600 font-medium">tháng</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2">Trạng thái</p>
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${product.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}
                  ></div>
                  <span className="text-lg font-semibold text-gray-900">
                    {product.status === 'active' ? 'Đang bán' : 'Ngừng bán'}
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow mb-6 p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gray-600" />
              Thư viện hình ảnh
            </h2>
            {allImages.length > 0 && (
              <span className="px-3 py-1.5 bg-gray-100 text-gray-700 font-medium rounded-lg text-sm">
                {currentImageIndex + 1} / {allImages.length}
              </span>
            )}
          </div>

          {allImages.length > 0 ? (
            <div className="space-y-4">
              {/* Carousel */}
              <div className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                <div className="aspect-video relative">
                  <img
                    src={allImages[currentImageIndex]}
                    alt={`Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain cursor-pointer"
                    onClick={() =>
                      openPreview(
                        allImages[currentImageIndex],
                        currentImageIndex === 0
                          ? 'Hình ảnh chính'
                          : `Hình ảnh ${currentImageIndex + 1}`
                      )
                    }
                    onError={e => {
                      e.currentTarget.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23f3f4f6" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="%239ca3af"%3EKhông có ảnh%3C/text%3E%3C/svg%3E';
                    }}
                  />

                  {currentImageIndex === 0 && (
                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg">
                      Ảnh chính
                    </div>
                  )}

                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white hover:bg-gray-50 rounded-lg shadow-md flex items-center justify-center transition-colors border border-gray-200"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white hover:bg-gray-50 rounded-lg shadow-md flex items-center justify-center transition-colors border border-gray-200"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="relative">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {allImages.map((imgUrl: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                          currentImageIndex === index
                            ? 'ring-2 ring-blue-600 opacity-100'
                            : 'ring-1 ring-gray-300 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={e => {
                            e.currentTarget.src =
                              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"%3E%3Crect fill="%23f3f4f6" width="96" height="96"/%3E%3C/svg%3E';
                          }}
                        />
                        {index === 0 && (
                          <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded">
                            Chính
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <ImageIcon className="w-16 h-16 text-gray-400 mb-3" />
              <p className="text-gray-500 text-sm">Chưa có hình ảnh sản phẩm</p>
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="bg-white rounded-lg shadow mb-6 p-5 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2 pb-3 border-b border-gray-200">
            <Tags className="w-5 h-5 text-gray-600" />
            Thông tin chi tiết
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Package, label: 'Loại sản phẩm', value: product.product_type_name_vn },
              { icon: Tags, label: 'Danh mục', value: product.category_name_vn },
              { icon: Tags, label: 'Danh mục con', value: product.subcategory_name_vn },
              {
                icon: Ruler,
                label: 'Kích thước (D × R × C)',
                value: `${product.length || 0} × ${product.width || 0} × ${product.height || 0} cm`,
              },
              { icon: Package, label: 'Chất liệu', value: product.material_vn },
              { icon: Palette, label: 'Màu sắc', value: product.color_vn },
              { icon: MapPin, label: 'Xuất xứ', value: product.origin_vn },
              { icon: Calendar, label: 'Ngày tạo', value: formatDate(product.created_at) },
              ...(product.updated_at
                ? [
                    {
                      icon: Clock,
                      label: 'Cập nhật lần cuối',
                      value: formatDate(product.updated_at),
                    },
                  ]
                : []),
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center border border-gray-200 shrink-0">
                    <item.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-1 font-medium">{item.label}</p>
                    <p className="font-semibold text-gray-900 text-sm">{item.value || '-'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        {product.description_vn && (
          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              Mô tả chi tiết sản phẩm
            </h2>
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed [&>p]:mb-4 [&>h2]:mt-6 [&>h2]:mb-4 [&>h2]:text-xl [&>h2]:font-bold [&>ul]:ml-6 [&>ul]:list-disc"
              dangerouslySetInnerHTML={{ __html: product.description_vn }}
            />
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={closePreview}
        >
          <div
            className="relative max-w-[95vw] max-h-[95vh] bg-white rounded-lg overflow-hidden shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-5 py-3 bg-gray-50 flex items-center justify-between border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">{previewModal.imageName}</h3>
              <button
                onClick={closePreview}
                className="w-8 h-8 rounded-lg hover:bg-gray-200 text-gray-600 transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-gray-100">
              <img
                src={previewModal.imageUrl}
                alt={previewModal.imageName}
                className="max-w-full max-h-[82vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
