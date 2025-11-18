import { useGetCategoriesQuery } from '@/services/api/categoryApi.ts';
import type { Category } from '@/types/category.type';
import { generateSubcategoryUrl } from '@/utils/productUrl';
import { selectFavoritesCount } from '@/slices/favoriteProductSlice';
import { Link } from '@tanstack/react-router';
import { ChevronDown, Heart, Menu, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchResultsDropdown from './SearchResultsDropdown';
import UserInfo from './UserInfo';

interface HeaderItem {
  id: string;
  display: string;
  path: string;
  isLogo?: boolean;
  isProducts?: boolean;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState<boolean>(false);
  const cartItemCount = 10;
  const favoritesCount = useSelector(selectFavoritesCount);

  const { data: categoriesData } = useGetCategoriesQuery({});

  const headerList: HeaderItem[] = [
    { id: 'ddstore', display: 'DDStore', path: '/', isLogo: true },
    { id: 'about', display: 'Về chúng tôi', path: '/about' },
    { id: 'catalog', display: 'Sản phẩm', path: '/catalog', isProducts: true },
    // { id: 'privacy', display: 'Chính sách bảo mật', path: '/privacy' },
    { id: 'contact', display: 'Liên hệ', path: '/contact' },
  ];

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories: Category[] = categoriesData?.data.categories || [];

  return (
    <header className="bg-(--green-primary) text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left Section: Mobile Menu Button + Logo + Desktop Navigation */}
          <div className="flex items-center gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 hover:bg-green-700 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <span className="text-2xl md:text-3xl font-bold text-yellow-400">DDStore</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {headerList
                .filter(item => !item.isLogo)
                .map(item => (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => item.isProducts && setIsProductDropdownOpen(true)}
                    onMouseLeave={() => item.isProducts && setIsProductDropdownOpen(false)}
                  >
                    <Link
                      to={item.path}
                      className="text-sm font-medium hover:text-yellow-400 transition-colors flex items-center gap-1 py-2 whitespace-nowrap"
                    >
                      {item.display}
                      {item.isProducts && <ChevronDown size={16} />}
                    </Link>

                    {/* Desktop Product Dropdown */}
                    {item.isProducts && isProductDropdownOpen && (
                      <div className="absolute top-full left-0 pt-2">
                        <div className="bg-white text-gray-800 rounded-lg shadow-xl min-w-[600px] p-6">
                          <div className="grid grid-cols-2 gap-8">
                            {categories.map(category => (
                              <div key={category.category_id}>
                                <h3 className="font-bold text-lg mb-3 text-green-800 border-b pb-2">
                                  {category.category_name_vn}
                                </h3>
                                <ul className="space-y-2">
                                  {category.subcategories?.map(subcategory => (
                                    <li key={subcategory.subcategory_id}>
                                      <Link
                                        to={generateSubcategoryUrl(
                                          category.category_name_vn,
                                          category.category_id,
                                          subcategory.subcategory_name_vn,
                                          subcategory.subcategory_id
                                        )}
                                        className="text-sm hover:text-green-700 hover:translate-x-1 transition-all inline-block"
                                        onClick={() => setIsProductDropdownOpen(false)}
                                      >
                                        {subcategory.subcategory_name_vn}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </nav>
          </div>

          {/* Right Section: Search + Avatar + Favorites + Cart */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Input - Hidden on mobile */}
            <div className="hidden md:block w-96 relative">
              <SearchResultsDropdown />
            </div>

            {/* UserInfo */}
            <div className="shrink-0">
              <UserInfo />
            </div>

            {/* Favorites */}
            <Link
              to="/favorite"
              className="relative p-2 hover:bg-green-700 rounded-lg transition-colors shrink-0"
              title="Danh sách yêu thích"
            >
              <Heart size={24} className="md:w-6 md:h-6" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount > 99 ? '99+' : favoritesCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-green-700 rounded-lg transition-colors shrink-0"
              title="Giỏ hàng"
            >
              <ShoppingCart size={24} className="md:w-6 md:h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search - Show below header */}
        <div className="md:hidden pb-3 relative">
          <SearchResultsDropdown />
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-green-700">
            <div className="flex flex-col space-y-3">
              {headerList.map(item => (
                <div key={item.id}>
                  <Link
                    to={item.path}
                    onClick={() => !item.isProducts && setIsMenuOpen(false)}
                    className={`text-sm font-medium hover:text-yellow-400 transition-colors py-2 ${
                      item.isLogo ? 'text-xl font-bold text-yellow-400 text-center mb-2' : ''
                    } flex items-center justify-between`}
                  >
                    {item.display}
                    {item.isProducts && <ChevronDown size={16} />}
                  </Link>

                  {/* Mobile Product List */}
                  {item.isProducts && (
                    <div className="ml-4 mt-2 space-y-3">
                      {categories.map(category => (
                        <div key={category.category_id}>
                          <h4 className="font-semibold text-yellow-300 mb-2">
                            {category.category_name_vn}
                          </h4>
                          <ul className="ml-4 space-y-1">
                            {category.subcategories?.map(subcategory => (
                              <li key={subcategory.subcategory_id}>
                                <Link
                                  to={generateSubcategoryUrl(
                                    category.category_name_vn,
                                    category.category_id,
                                    subcategory.subcategory_name_vn,
                                    subcategory.subcategory_id
                                  )}
                                  className="text-sm text-gray-200 hover:text-yellow-400"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {subcategory.subcategory_name_vn}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
