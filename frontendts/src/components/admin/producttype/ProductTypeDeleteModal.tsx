import OverLay from '@/components/ui/OverLay.tsx';
import Button from '@/components/ui/custome/Button.tsx';
import { useDeleteProductTypeByIdMutation } from '@/services/api/productTypeApi';
import { showToast } from '@/utils/toastMessages';
import { AlertTriangle, Folder, List, Tag, X } from 'lucide-react';

interface ProductTypeDeleteModalProps {
  setOpenDeleteModal: (open: boolean) => void;
  productType: {
    product_type_id: number;
    product_type_name_vn: string;
    image_url?: string | null;
    status?: string;
  } | null;
  onSuccess?: () => void;
}

const ProductTypeDeleteModal = ({
  setOpenDeleteModal,
  productType,
  onSuccess,
}: ProductTypeDeleteModalProps) => {
  const [deleteProductType, { isLoading }] = useDeleteProductTypeByIdMutation();

  const handleDelete = async () => {
    if (!productType) return;
    try {
      await deleteProductType(productType.product_type_id).unwrap();
      showToast({ message: 'Xóa loại sản phẩm thành công!', type: 'success' });
      setOpenDeleteModal(false);
      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === 'object' && 'data' in error
          ? ((error as { data?: { message?: string } }).data?.message ??
            'Không thể xóa loại sản phẩm')
          : 'Không thể xóa loại sản phẩm';
      showToast({ message: errorMessage, type: 'error' });
    }
  };

  if (!productType) return null;

  return (
    <div>
      <OverLay />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-200 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-yellow-900">Cảnh báo xóa loại sản phẩm</h2>
                <p className="text-sm text-yellow-700">
                  Hành động này sẽ xóa vĩnh viễn loại sản phẩm và không thể hoàn tác.
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpenDeleteModal(false)}
              className="w-8 h-8 rounded-lg hover:bg-yellow-100 text-gray-600 transition-colors flex items-center justify-center"
              aria-label="Đóng cảnh báo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* ProductType Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
              <div className="flex gap-4 items-center">
                {productType.image_url ? (
                  <img
                    src={productType.image_url}
                    alt={productType.product_type_name_vn}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-300 shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center shrink-0">
                    <Folder className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
                    {productType.product_type_name_vn}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Mã ID: <span className="font-medium">{productType.product_type_id}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Trạng thái:{' '}
                    <span
                      className={
                        productType.status === 'active' ? 'text-green-600' : 'text-red-600'
                      }
                    >
                      {productType.status === 'active' ? 'Hoạt động' : 'Vô hiệu hóa'}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Warning Message */}
            <div className="mb-6">
              <p className="text-gray-700 mb-4 text-base leading-relaxed">
                Bạn có chắc chắn muốn xóa loại sản phẩm{' '}
                <span className="font-bold text-gray-900">{productType.product_type_name_vn}</span>{' '}
                không?
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
                  <span>Xóa vĩnh viễn loại sản phẩm này khỏi hệ thống</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <List className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                  <span>Xóa tất cả các sản phẩm liên quan</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <Tag className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                  <span>Xóa các liên kết với các bảng khác (nếu có)</span>
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
                  <strong>Lưu ý:</strong> Nếu loại sản phẩm này đang được sử dụng trong sản phẩm
                  hoặc các bảng liên quan, bạn sẽ không thể xóa nó. Hệ thống sẽ thông báo lỗi khi
                  thực hiện xóa.
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
                    Xóa loại sản phẩm
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

export default ProductTypeDeleteModal;
