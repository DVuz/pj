const AdminTest = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Chào mừng đến với trang quản trị DDStore</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">150</div>
          <div className="text-sm text-gray-600">Sản phẩm</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">1,234</div>
          <div className="text-sm text-gray-600">Đơn hàng</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">456</div>
          <div className="text-sm text-gray-600">Khách hàng</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">78</div>
          <div className="text-sm text-gray-600">Báo cáo</div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Test Component</h2>
        <p className="text-gray-600">Đây là component test để kiểm tra layout admin đang hoạt động bình thường.</p>
      </div>
    </div>
  );
};

export default AdminTest;
