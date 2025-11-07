import React, { useState, useEffect } from 'react';
import { Menu, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { MENU_ITEMS } from '../../constants/adminMenuSidebar';

interface OpenMenusState {
  [key: string]: boolean;
}

interface MenuItemType {
  key: string;
  label: string;
  icon: React.ReactNode;
  items: Array<{
    label: string;
    fullPath: string;
    icon: React.ReactNode;
  }>;
}

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onMenuSelect?: (menuLabel: string, subMenuLabel?: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  onMenuSelect
}) => {
  const [openMenus, setOpenMenus] = useState<OpenMenusState>({});
  const location = useLocation();

  // Auto-open menu based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    MENU_ITEMS.forEach(menuItem => {
      const hasActiveSubmenu = menuItem.items.some(subItem =>
        currentPath.startsWith(subItem.fullPath)
      );
      if (hasActiveSubmenu) {
        setOpenMenus(prev => ({ ...prev, [menuItem.key]: true }));

        const activeSubmenu = menuItem.items.find(subItem =>
          currentPath.startsWith(subItem.fullPath)
        );
        if (activeSubmenu && onMenuSelect) {
          onMenuSelect(menuItem.label, activeSubmenu.label);
        }
      }
    });
  }, [location.pathname, onMenuSelect]);

  const toggleMenu = (key: string): void => {
    setOpenMenus(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleIconClick = (menuItem: MenuItemType): void => {
    if (isCollapsed) {
      onToggleCollapse();
      setOpenMenus({ [menuItem.key]: true });
    } else {
      toggleMenu(menuItem.key);
    }

    if (onMenuSelect) {
      onMenuSelect(menuItem.label);
    }
  };

  const handleSubMenuClick = (menuItem: MenuItemType, subItem: MenuItemType['items'][0]): void => {
    if (onMenuSelect) {
      onMenuSelect(menuItem.label, subItem.label);
    }
  };

  const isActiveLink = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <div className="h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>}
        <button
          onClick={onToggleCollapse}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="h-[calc(100%-4rem)] overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          {MENU_ITEMS.map(menuItem => (
            <li key={menuItem.key}>
              <button
                onClick={() => handleIconClick(menuItem)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 text-left
                  text-gray-700 hover:bg-gray-100 rounded-lg transition-colors
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                title={isCollapsed ? menuItem.label : undefined}
              >
                <div className="flex items-center space-x-3">
                  <span className="flex-shrink-0">{menuItem.icon}</span>
                  {!isCollapsed && <span className="font-medium">{menuItem.label}</span>}
                </div>
                {!isCollapsed && (
                  <span className="flex-shrink-0">
                    {openMenus[menuItem.key] ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </span>
                )}
              </button>

              {/* Submenu */}
              {openMenus[menuItem.key] && !isCollapsed && (
                <ul className="mt-2 ml-6 space-y-1">
                  {menuItem.items.map(subItem => (
                    <li key={subItem.fullPath}>
                      <Link
                        to={subItem.fullPath}
                        className={`
                          flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors
                          ${
                            isActiveLink(subItem.fullPath)
                              ? 'bg-blue-100 text-blue-900 font-medium'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }
                        `}
                        onClick={() => handleSubMenuClick(menuItem, subItem)}
                      >
                        <span className="flex-shrink-0">{subItem.icon}</span>
                        <span>{subItem.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
