import React from 'react';
import { Home } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface AdminHeaderProps {
  currentMenu?: string;
  currentSubMenu?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ currentMenu, currentSubMenu }) => {
  const getTitle = (): string => {
    if (currentSubMenu) {
      return `${currentMenu} - ${currentSubMenu}`;
    }
    return currentMenu || 'Admin Dashboard';
  };

  const getBreadcrumb = (): React.ReactNode => {
    if (currentSubMenu) {
      return (
        <div className="text-sm text-gray-500">
          <span>Admin</span>
          <span className="mx-2">›</span>
          <span>{currentMenu}</span>
          <span className="mx-2">›</span>
          <span className="text-blue-600">{currentSubMenu}</span>
        </div>
      );
    }
    if (currentMenu && currentMenu !== 'Admin Dashboard') {
      return (
        <div className="text-sm text-gray-500">
          <span>Admin</span>
          <span className="mx-2">›</span>
          <span className="text-blue-600">{currentMenu}</span>
        </div>
      );
    }
    return <div className="text-sm font-medium text-gray-500">Admin</div>;
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 grid grid-cols-2 items-center">
          {/* Left column: logo + title */}
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded object-cover" />
            <div>
              {getBreadcrumb()}
              <div className="text-lg font-semibold text-blue-600">{getTitle()}</div>
            </div>
          </div>

          {/* Right column: actions */}
          <div className="flex justify-end items-center space-x-3">
            <Link
              to="/"
              aria-label="Home"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
            >
              <Home className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
