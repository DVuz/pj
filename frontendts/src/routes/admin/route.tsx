import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import type { RootState } from '../../stores/store';

function AdminLayout() {
  const navigate = useNavigate();
  const [currentMenu, setCurrentMenu] = useState<string>('');
  const [currentSubMenu, setCurrentSubMenu] = useState<string>('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const { userInfo } = useSelector((state: RootState) => state.authInfo);
  const isAdmin = userInfo?.role === 'Admin';

  useEffect(() => {
    // Chưa đăng nhập -> redirect login
    if (!userInfo) {
      navigate({ to: '/login' });
      return;
    }

    // Đã đăng nhập nhưng không phải admin -> 403
    if (!isAdmin) {
      navigate({ to: '/403' });
      return;
    }
  }, [userInfo, isAdmin, navigate]);

  const handleMenuSelect = (menuLabel: string, subMenuLabel?: string) => {
    setCurrentMenu(menuLabel);
    setCurrentSubMenu(subMenuLabel || '');
    const title = subMenuLabel
      ? `${menuLabel} - ${subMenuLabel} | Admin DDStore`
      : `${menuLabel} | Admin DDStore`;
    document.title = title;
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Loading state khi đang kiểm tra quyền
  if (!userInfo || !isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Đang kiểm tra quyền truy cập...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Bên trái, full height */}
      <div
        className={`transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-16' : 'w-72'}`}
      >
        <AdminSidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          onMenuSelect={handleMenuSelect}
        />
      </div>

      {/* Right Side - Header + Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header - Chỉ phần bên phải */}
        <AdminHeader currentMenu={currentMenu} currentSubMenu={currentSubMenu} />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
});
