import { Home, Package } from 'lucide-react';

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full text-center border border-gray-100">
        {/* Icon circle */}
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-red-50 mb-6">
          <span className="text-5xl font-bold text-red-500">404</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Không tìm thấy trang</h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-8 leading-relaxed">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          <a
            href="/"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            aria-label="Về trang chủ"
          >
            <Home className="w-5 h-5" />
            Trở về trang chủ
          </a>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-300"
            aria-label="Quay lại"
            type="button"
          >
            <Package className="w-5 h-5" />
            Quay lại
          </button>
        </div>

        {/* Footer text */}
        <p className="text-xs text-gray-500 mt-6 leading-relaxed">
          Nếu bạn cho rằng đây là lỗi, vui lòng liên hệ với chúng tôi.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
