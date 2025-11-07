import { createFileRoute, Link } from '@tanstack/react-router';
import { Home, Lock, ShieldAlert } from 'lucide-react';

function ForbiddenPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full text-center border border-gray-100">
        {/* Icon circle */}
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-orange-50 mb-6">
          <ShieldAlert className="w-16 h-16 text-orange-500" strokeWidth={1.5} />
        </div>

        {/* Error code */}
        <div className="mb-4">
          <span className="inline-block px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            Lỗi 403
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Truy cập bị từ chối</h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-2 leading-relaxed">
          Bạn không có quyền truy cập vào trang này.
        </p>
        <p className="text-gray-500 text-xs mb-8 leading-relaxed">
          Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium shadow-sm hover:shadow-md"
            aria-label="Về trang chủ"
          >
            <Home className="w-5 h-5" />
            Trở về trang chủ
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-300"
            aria-label="Quay lại"
            type="button"
          >
            <Lock className="w-5 h-5" />
            Quay lại trang trước
          </button>
        </div>

        {/* Info box */}
        <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
          <p className="text-xs text-gray-700 leading-relaxed">
            <span className="font-semibold">Lưu ý:</span> Trang này yêu cầu quyền truy cập đặc biệt.
            Nếu bạn cần truy cập, vui lòng liên hệ bộ phận hỗ trợ.
          </p>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/403')({
  component: ForbiddenPage,
});
  