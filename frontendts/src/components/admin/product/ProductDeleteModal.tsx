import OverLay from '@/components/ui/OverLay.tsx';
import Button from '@/components/ui/custome/Button.tsx';
import { useDeleteProductMutation } from '@/services/api/productApi';
import { showToast } from '@/utils/toastMessages';
import { AlertTriangle, MessageSquare, Package, ShoppingCart, X } from 'lucide-react';

interface ProductDeleteModalProps {
  setOpenDeleteModal: (open: boolean) => void;
  product: {
    product_id: number;
    product_name_vn: string;
    product_code: string;
    main_image?: string;
    price: number;
  } | null;
  onSuccess?: () => void;
}

const ProductDeleteModal = ({
  setOpenDeleteModal,
  product,
  onSuccess,
}: ProductDeleteModalProps) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDelete = async () => {
    if (!product) return;

    try {
      await deleteProduct(product.product_id).unwrap();
      showToast({
        message: 'Xóa sản phẩm thành công!',
        type: 'success',
      });
      setOpenDeleteModal(false);
      // Gọi callback để refresh data
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === 'object' && 'data' in error
          ? ((error as { data?: { message?: string } }).data?.message ?? 'Không thể xóa sản phẩm')
          : 'Không thể xóa sản phẩm';
      showToast({
        message: errorMessage,
        type: 'error',
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (!product) return null;

  return (
    <div>
      <OverLay />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Xác nhận xóa sản phẩm</h2>
                <p className="text-sm text-red-600">Hành động này không thể hoàn tác</p>
              </div>
            </div>
            <button
              onClick={() => setOpenDeleteModal(false)}
              className="w-8 h-8 rounded-lg hover:bg-red-100 text-gray-600 transition-colors flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Product Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
              <div className="flex gap-4">
                {product.main_image ? (
                  <img
                    src={product.main_image}
                    alt={product.product_name_vn}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-300 shrink-0"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center shrink-0">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
                    {product.product_name_vn}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Mã: <span className="font-medium">{product.product_code}</span>
                  </p>
                  <p className="text-base font-semibold text-green-700">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            </div>

            {/* Warning Message */}
            <div className="mb-6">
              <p className="text-gray-700 mb-4 text-base leading-relaxed">
                Bạn có chắc chắn muốn xóa sản phẩm{' '}
                <span className="font-bold text-gray-900">{product.product_name_vn}</span> không?
              </p>
            </div>

            {/* Impact List */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Tác động của hành động này:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-red-500 font-bold mt-0.5">•</span>
                  <span>Xóa vĩnh viễn sản phẩm này khỏi hệ thống</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <ShoppingCart className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                  <span>Xóa sản phẩm này khỏi giỏ hàng của tất cả khách hàng</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                  <span>Xóa tất cả các đánh giá liên quan đến sản phẩm này</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-red-500 font-bold mt-0.5">•</span>
                  <span className="font-semibold text-red-700">
                    Không thể hoàn tác hành động này
                  </span>
                </li>
              </ul>
            </div>

            {/* Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">ℹ</span>
                <span>
                  <strong>Lưu ý:</strong> Nếu sản phẩm này đang được sử dụng trong đơn hàng, bạn sẽ
                  không thể xóa nó. Hệ thống sẽ thông báo lỗi khi thực hiện xóa.
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setOpenDeleteModal(false)}
                disabled={isLoading}
                className="px-6"
              >
                Hủy bỏ
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={isLoading}
                className="px-6 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang xóa...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4" />
                    Xóa sản phẩm
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDeleteModal;
