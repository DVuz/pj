import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useUrlSync } from '../../../../../hooks/common/useUrlSync';

const MAX_PRICE = 50000000;

interface PriceFilterProps {
  onPriceRangeChange: (minPrice: number, maxPrice: number) => void;
  initialMinPrice?: number;
  initialMaxPrice?: number;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  onPriceRangeChange,
  initialMinPrice,
  initialMaxPrice,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(initialMinPrice || 0);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice || MAX_PRICE);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { updateUrlParams } = useUrlSync();

  // Sync with initial values when props change
  useEffect(() => {
    if (initialMinPrice !== undefined) {
      setMinPrice(initialMinPrice);
    }
    if (initialMaxPrice !== undefined) {
      setMaxPrice(initialMaxPrice);
    }
  }, [initialMinPrice, initialMaxPrice]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const handleApplyFilter = () => {
    onPriceRangeChange(minPrice, maxPrice);
    // Only update URL if values are different from initial values
    if (minPrice !== (initialMinPrice || 0) || maxPrice !== (initialMaxPrice || MAX_PRICE)) {
      updateUrlParams({ min_price: minPrice, max_price: maxPrice });
    }
    setIsOpen(false);
  };

  const handleReset = () => {
    setMinPrice(0);
    setMaxPrice(MAX_PRICE);
    onPriceRangeChange(0, MAX_PRICE);
    updateUrlParams({ min_price: undefined, max_price: undefined });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Nút mở dropdown */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between px-3 py-2 w-56 h-9 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
      >
        <span className="font-medium text-gray-700 truncate">
          {minPrice === 0 && maxPrice === MAX_PRICE
            ? 'Chọn khoảng giá'
            : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 ml-2 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-2 shrink-0" />
        )}
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Hãy chọn mức giá phù hợp với bạn
          </h3>

          {/* Input fields */}
          <div className="flex items-center gap-2 mb-4">
            <input
              type="number"
              value={minPrice === 0 ? '' : minPrice}
              onChange={e => setMinPrice(Number(e.target.value) || 0)}
              className="w-32 px-3 py-2 border border-gray-300 rounded text-right text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="0đ"
            />
            <span className="text-gray-500 text-sm">-</span>
            <input
              type="number"
              value={maxPrice === MAX_PRICE ? '' : maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value) || MAX_PRICE)}
              className="w-32 px-3 py-2 border border-gray-300 rounded text-right text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="50.000.000đ"
            />
          </div>

          {/* Range slider */}
          <div className="mb-4">
            <div className="relative h-2">
              <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>
              <div
                className="absolute h-2 bg-blue-600 rounded-full"
                style={{
                  left: `${(minPrice / MAX_PRICE) * 100}%`,
                  right: `${100 - (maxPrice / MAX_PRICE) * 100}%`,
                }}
              ></div>
              <input
                type="range"
                min="0"
                max={MAX_PRICE}
                step="100000"
                value={minPrice}
                onChange={e => setMinPrice(Math.min(Number(e.target.value), maxPrice - 100000))}
                className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max={MAX_PRICE}
                step="100000"
                value={maxPrice}
                onChange={e => setMaxPrice(Math.max(Number(e.target.value), minPrice + 100000))}
                className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 font-medium text-sm"
            >
              Đặt lại
            </button>
            <button
              type="button"
              onClick={handleApplyFilter}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium text-sm"
            >
              Áp dụng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
