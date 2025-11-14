import {
  LayoutDashboard,
  Package,
  ListOrdered,
  Users,
  ShoppingCart,
  Warehouse,
  Boxes,
  Factory,
  Truck,
  Percent,
  // Ticket,
  MessageCircle,
  BarChart3,
  TrendingUp,
  Plus,
  List,
  Edit,
  Eye,
  Settings,
  Clock,
  CheckCircle,
} from 'lucide-react';

export const MENU_ITEMS = [
  {
    key: 'dashboard',
    label: 'Tổng quan',
    icon: <LayoutDashboard size={18} />,
    items: [
      {
        label: 'Dashboard',
        fullPath: '/admin/dashboard',
        icon: <BarChart3 size={16} />,
      },
      {
        label: 'Phân tích doanh thu',
        fullPath: '/admin/analytics/revenue',
        icon: <TrendingUp size={16} />,
      },
      {
        label: 'Báo cáo tổng quan',
        fullPath: '/admin/reports/overview',
        icon: <Eye size={16} />,
      },
    ],
  },
  {
    key: 'products',
    label: 'Quản lý sản phẩm',
    icon: <Package size={18} />,
    items: [
      {
        label: 'Tạo sản phẩm mới',
        fullPath: '/admin/products/create',
        icon: <Plus size={16} />,
      },
      {
        label: 'Danh sách sản phẩm',
        fullPath: '/admin/products/list',
        icon: <List size={16} />,
      },
      {
        label: 'Chỉnh sửa sản phẩm',
        fullPath: '/admin/products/edit',
        icon: <Edit size={16} />,
      },
      {
        label: 'Quản lý tồn kho',
        fullPath: '/admin/products/inventory',
        icon: <Warehouse size={16} />,
      },
      {
        label: 'Serial sản phẩm',
        fullPath: '/admin/products/serials',
        icon: <Settings size={16} />,
      },
    ],
  },
  {
    key: 'categories',
    label: 'Danh mục & Phân loại',
    icon: <ListOrdered size={18} />,
    items: [
      {
        label: 'Tạo danh mục chính',
        fullPath: '/admin/categories/create',
        icon: <Plus size={16} />,
      },
      {
        label: 'Tạo danh mục con',
        fullPath: '/admin/subcategories/create',
        icon: <Plus size={16} />,
      },
      {
        label: 'Tạo loại sản phẩm',
        fullPath: '/admin/product-types/create',
        icon: <Plus size={16} />,
      },
      {
        label: 'Quản lý danh mục',
        fullPath: '/admin/categories/list',
        icon: <List size={16} />,
      },
      {
        label: 'Quản lý danh mục con',
        fullPath: '/admin/subcategories/list',
        icon: <List size={16} />,
      },
      {
        label: 'Quản lý loại sản phẩm',
        fullPath: '/admin/product-types/list',
        icon: <List size={16} />,
      },
    ],
  },
  {
    key: 'users',
    label: 'Quản lý người dùng',
    icon: <Users size={18} />,
    items: [
      {
        label: 'Danh sách khách hàng',
        fullPath: '/admin/users/customers',
        icon: <Users size={16} />,
      },
      {
        label: 'Danh sách shipper',
        fullPath: '/admin/users/shippers',
        icon: <Truck size={16} />,
      },
      {
        label: 'Quản lý tài khoản',
        fullPath: '/admin/users/accounts',
        icon: <Settings size={16} />,
      },
      {
        label: 'Quyền & vai trò',
        fullPath: '/admin/users/permissions',
        icon: <CheckCircle size={16} />,
      },
    ],
  },
  {
    key: 'orders',
    label: 'Quản lý đơn hàng',
    icon: <ShoppingCart size={18} />,
    items: [
      {
        label: 'Tất cả đơn hàng',
        fullPath: '/admin/orders',
        icon: <List size={16} />,
      },
      {
        label: 'Đơn hàng chờ xử lý',
        fullPath: '/admin/orders/pending',
        icon: <Clock size={16} />,
      },
      {
        label: 'Đơn hàng đang giao',
        fullPath: '/admin/orders/shipping',
        icon: <Truck size={16} />,
      },
      {
        label: 'Đơn hàng hoàn thành',
        fullPath: '/admin/orders/completed',
        icon: <CheckCircle size={16} />,
      },
      {
        label: 'Đơn hàng đã hủy',
        fullPath: '/admin/orders/cancelled',
        icon: <Eye size={16} />,
      },
    ],
  },
  {
    key: 'inventory',
    label: 'Quản lý kho',
    icon: <Warehouse size={18} />,
    items: [
      {
        label: 'Tạo kho mới',
        fullPath: '/admin/warehouses/create',
        icon: <Plus size={16} />,
      },
      {
        label: 'Danh sách kho',
        fullPath: '/admin/warehouses',
        icon: <List size={16} />,
      },
      {
        label: 'Nhập kho',
        fullPath: '/admin/inventory/import',
        icon: <TrendingUp size={16} />,
      },
      {
        label: 'Xuất kho',
        fullPath: '/admin/inventory/export',
        icon: <TrendingUp size={16} />,
      },
      {
        label: 'Báo cáo tồn kho',
        fullPath: '/admin/inventory/reports',
        icon: <BarChart3 size={16} />,
      },
    ],
  },
  {
    key: 'batches',
    label: 'Quản lý lô hàng',
    icon: <Boxes size={18} />,
    items: [
      {
        label: 'Tạo lô hàng mới',
        fullPath: '/admin/batches/create',
        icon: <Plus size={16} />,
      },
      {
        label: 'Danh sách lô hàng',
        fullPath: '/admin/batches',
        icon: <List size={16} />,
      },
      {
        label: 'Lô hàng sắp hết hạn',
        fullPath: '/admin/batches/expiring',
        icon: <Clock size={16} />,
      },
      {
        label: 'Theo dõi lô hàng',
        fullPath: '/admin/batches/tracking',
        icon: <Eye size={16} />,
      },
    ],
  },
  {
    key: 'manufacturers',
    label: 'Nhà sản xuất',
    icon: <Factory size={18} />,
    items: [
      {
        label: 'Thêm nhà sản xuất',
        fullPath: '/admin/manufacturers/create',
        icon: <Plus size={16} />,
      },
      {
        label: 'Danh sách nhà sản xuất',
        fullPath: '/admin/manufacturers',
        icon: <List size={16} />,
      },
      {
        label: 'Đánh giá nhà sản xuất',
        fullPath: '/admin/manufacturers/reviews',
        icon: <Eye size={16} />,
      },
    ],
  },
  {
    key: 'shipping',
    label: 'Vận chuyển & Phí',
    icon: <Truck size={18} />,
    items: [
      {
        label: 'Cấu hình phí vận chuyển',
        fullPath: '/admin/shipping/fees/create',
        icon: <Plus size={16} />,
      },
      {
        label: 'Quản lý phí vận chuyển',
        fullPath: '/admin/shipping/fees',
        icon: <List size={16} />,
      },
      {
        label: 'Khu vực vận chuyển',
        fullPath: '/admin/shipping/zones',
        icon: <Settings size={16} />,
      },
      {
        label: 'Nhà vận chuyển',
        fullPath: '/admin/shipping/providers',
        icon: <Truck size={16} />,
      },
    ],
  },
  {
    key: 'promotions',
    label: 'Khuyến mãi',
    icon: <Percent size={18} />,
    items: [
      {
        label: 'Tạo chương trình giảm giá',
        fullPath: '/admin/promotions/discounts/create',
        icon: <Plus size={16} />,
      },
      {
        label: 'Quản lý giảm giá',
        fullPath: '/admin/promotions/discounts',
        icon: <List size={16} />,
      },
      {
        label: 'Tạo mã giảm giá',
        fullPath: '/admin/promotions/coupons/create',
        icon: <Plus size={16} />,
      },
      {
        label: 'Quản lý mã giảm giá',
        fullPath: '/admin/promotions/coupons',
        icon: <List size={16} />,
      },
      {
        label: 'Flash Sale',
        fullPath: '/admin/promotions/flash-sales',
        icon: <TrendingUp size={16} />,
      },
    ],
  },
  {
    key: 'communication',
    label: 'Hỗ trợ & Giao tiếp',
    icon: <MessageCircle size={18} />,
    items: [
      {
        label: 'Chat với khách hàng',
        fullPath: '/admin/chat/customers',
        icon: <MessageCircle size={16} />,
      },
      {
        label: 'Hỗ trợ kỹ thuật',
        fullPath: '/admin/support/tickets',
        icon: <CheckCircle size={16} />,
      },
      {
        label: 'Thông báo hệ thống',
        fullPath: '/admin/notifications',
        icon: <Eye size={16} />,
      },
    ],
  },
  {
    key: 'settings',
    label: 'Cài đặt hệ thống',
    icon: <Settings size={18} />,
    items: [
      {
        label: 'Cài đặt chung',
        fullPath: '/admin/settings/general',
        icon: <Settings size={16} />,
      },
      {
        label: 'Cài đặt thanh toán',
        fullPath: '/admin/settings/payment',
        icon: <Settings size={16} />,
      },
      {
        label: 'Cài đặt email',
        fullPath: '/admin/settings/email',
        icon: <Settings size={16} />,
      },
      {
        label: 'Backup & Restore',
        fullPath: '/admin/settings/backup',
        icon: <Settings size={16} />,
      },
    ],
  },
];
