import { Link } from '@tanstack/react-router';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import UserInfo from './UserInfo';

interface HeaderItem {
  id: string;
  display: string;
  path: string;
  isLogo?: boolean;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const headerList: HeaderItem[] = [
    { id: 'ddstore', display: 'DDStore', path: '/', isLogo: true },
    { id: 'about', display: 'Về chúng tôi', path: '/about' },
    { id: 'catalog', display: 'Sản phẩm', path: '/catalog' },
    { id: 'privacy', display: 'Chính sách bảo mật', path: '/privacy' },
    { id: 'contact', display: 'Liên hệ', path: '/contact' },
  ];

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50 bg-[#16512e] text-white shadow-md">
      <div className="max-w-[1560px] mx-auto px-5 py-2.5 flex justify-between items-center relative">
        {/* Logo for desktop */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-[#f59e0b] hover:opacity-80 transition-opacity"
        >
          DDStore
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {headerList
            .filter(item => !item.isLogo)
            .map(item => (
              <Link
                key={item.id}
                to={item.path}
                className="text-sm font-medium text-white hover:text-[#f59e0b] transition-colors"
              >
                {item.display}
              </Link>
            ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <UserInfo />
          <ShoppingCart
            className="text-white cursor-pointer hover:text-[#f59e0b] transition-colors"
            size={24}
          />

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden bg-transparent border-0 text-white cursor-pointer p-1.5"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#16512e] border-t border-white/10 p-4">
            <nav className="flex flex-col gap-4">
              {headerList.map(item => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`font-medium no-underline text-white px-2 py-2 rounded transition-all hover:bg-white/10 hover:text-[#f59e0b] ${
                    item.isLogo
                      ? 'text-xl font-extrabold text-[#f59e0b] text-center mb-2'
                      : 'text-base'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.display}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
