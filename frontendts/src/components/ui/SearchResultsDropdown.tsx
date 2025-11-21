import { useProductSearch } from '@/hooks/product/useProductSearch';
import { createSlug } from '@/utils/productUrl';
import { useNavigate } from '@tanstack/react-router';
import { Search, X } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import type {Product} from "@/types/common.types.ts";

interface SearchResultsDropdownProps {
  onClose?: () => void;
}

const SearchResultsDropdown: React.FC<SearchResultsDropdownProps> = () => {
  const navigate = useNavigate();
  const {
    searchTerm,
    debouncedSearchTerm,
    products,
    isLoading,
    handleSearchChange,
    clearSearch,
    hasResults,
  } = useProductSearch();

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown khi click bên ngoài (chỉ đóng dropdown, không đóng input)
  useEffect(() => {
    const handleClickOutside = () => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains &&
        searchTerm
      ) {
        clearSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchTerm, clearSearch]);

  const handleProductClick = (product: Product) => {
    const productSlug = createSlug(product.product_name_vn);
    const url = `/product/${productSlug}-${product.product_id}`;
    navigate({ to: url });
    clearSearch();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Search Input - Always visible */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => handleSearchChange(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full pl-10 pr-10 py-2.5 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Dropdown Results - Only show when there's searchTerm */}
      {searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[500px] overflow-hidden">
          <div className="max-h-[500px] overflow-y-auto">
            {/* Loading state */}
            {isLoading && (
              <div className="p-4 text-center text-sm text-gray-500">
                <div className="inline-block w-4 h-4 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin mr-2"></div>
                Đang tìm kiếm...
              </div>
            )}

            {/* No input yet */}
            {!hasResults && !isLoading && (
              <div className="p-4 text-center text-sm text-gray-500">
                Nhập ít nhất 2 ký tự để tìm kiếm
              </div>
            )}

            {/* No results */}
            {hasResults && !isLoading && products.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">
                Không tìm thấy sản phẩm nào với từ khóa "{debouncedSearchTerm}"
              </div>
            )}

            {/* Results list */}
            {hasResults && !isLoading && products.length > 0 && (
              <div className="py-2">
                <div className="px-4 py-2 text-xs text-gray-500 font-medium">
                  Tìm thấy {products.length} sản phẩm
                </div>
                {products.map((product: Product) => (
                  <button
                    key={product.product_id}
                    onClick={() => handleProductClick(product)}
                    className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-left transition-colors"
                  >
                    <img
                      src={product.main_image}
                      alt={product.product_name_vn}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {product.product_name_vn}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {product.product_type_name_vn}
                      </p>
                      <p className="text-sm font-bold text-orange-600 mt-0.5">
                        {product.price.toLocaleString('vi-VN')} VNĐ
                      </p>
                    </div>
                  </button>
                ))}

                {/* Show all results link */}
                <div className="border-t border-gray-200 mt-2">
                  <button
                    onClick={() => {
                      // Navigate to search results page with query
                      // navigate({ to: '/search', search: { q: debouncedSearchTerm } });
                      clearSearch();
                    }}
                    className="w-full px-4 py-3 text-sm text-green-700 hover:bg-green-50 font-medium transition-colors"
                  >
                    Xem tất cả kết quả →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsDropdown;
