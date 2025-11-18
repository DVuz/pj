import {
  BarChart3,
  HelpCircle,
  LogOut,
  MessageCircle,
  Settings,
  ShoppingBag,
  Tag,
} from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from '@tanstack/react-router';
import { useLogoutMutation } from '../../services/api/authApi';
import type { RootState } from '../../stores/store';

const userMenuItems = [
  {
    id: 'account',
    display: 'Cài đặt tài khoản',
    path: '/account',
    icon: Settings,
  },
  { id: 'coupons', display: 'Mã khuyến mãi', path: '/coupons', icon: Tag },
  {
    id: 'orders',
    display: 'Đơn hàng của bạn',
    path: '/orders',
    icon: ShoppingBag,
  },
  {
    id: 'manage-store',
    display: 'Quản lý cửa hàng',
    path: '/admin',
    icon: BarChart3,
    role_required: 'Admin',
  },
  {
    id: 'messages',
    display: 'Tin nhắn',
    path: '/messages',
    icon: MessageCircle,
    role_required: 'Admin',
  },
  { id: 'help', display: 'help', path: '/help', icon: HelpCircle },
];

const UserInfo = () => {
const { userInfo } = useSelector((state: RootState) => state.authInfo);
  const [showMenu, setShowMenu] = useState(false);
  const [logout] = useLogoutMutation();

  console.log('User Info:', userInfo);
  const isLoggedIn = userInfo;
  const defaultAvatar = import.meta.env.VITE_AVATAR_DEFAULT;

  const filteredMenuItems = userMenuItems.filter(item => {
    if (item.role_required && userInfo?.role !== item.role_required) {
      return false;
    }
    return true;
  });

  return (
    <>
      {isLoggedIn ? (
        <div className="relative">
          <div className="cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
            <img src={defaultAvatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
          </div>

          {showMenu && (
            <div className="absolute top-full right-0 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] w-[280px] z-1000 mt-2 overflow-hidden">
              <div className="flex items-center p-5 bg-gray-50 border-b border-gray-200">
                <img
                  src={defaultAvatar}
                  alt="Avatar"
                  className="w-[60px] h-[60px] rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-base font-semibold m-0 mb-1 text-[#ff6b35]">
                    {userInfo?.user_name || 'Admin'}
                  </h3>
                  <p className="text-sm text-gray-600 m-0 mb-0.5">
                    {userInfo?.email || 'user@gmail.com'}
                  </p>
                  <p className="text-xs text-gray-400 m-0">{userInfo?.role || 'Quản trị viên'}</p>
                </div>
              </div>

              <div className="py-2">
                {filteredMenuItems.map(item => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="flex items-center py-3 px-5 text-gray-800 no-underline transition-colors hover:bg-gray-50"
                      onClick={() => setShowMenu(false)}
                    >
                      <IconComponent className="mr-3 text-[#ff6b35]" size={16} />
                      <span>{item.display}</span>
                    </Link>
                  );
                })}
                <button
                  className="flex items-center w-full py-3 px-5 text-gray-800 no-underline transition-colors hover:bg-gray-50 border-t border-gray-200 mt-1 bg-transparent border-0 text-left cursor-pointer"
                  onClick={() => {
                    logout();
                  }}
                >
                  <LogOut className="mr-3 text-red-600" size={16} />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 py-2.5 px-6 bg-(--yellow-primary) text-white text-[15px] font-semibold rounded-3xl hover:bg-linear-to-r hover:from-[#ffb347] hover:to-[#ff6b35] hover:shadow-[0_4px_16px_rgba(255,107,53,0.25)] transition-all"
          >
            Đăng nhập
          </Link>
        </div>
      )}
    </>
  );
};

export default UserInfo;
