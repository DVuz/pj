import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetProductTypesQuery } from '@/services/api/productTypeApi';
import type { ProductType } from '@/types/product-type.type';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Vô hiệu hóa' },
];

const SORT_OPTIONS = [
  { value: 'created_at|ASC', label: 'Cũ nhất' },
  { value: 'created_at|DESC', label: 'Mới nhất' },
  { value: 'product_name_vn|ASC', label: 'Tên A-Z' },
  { value: 'product_name_vn|DESC', label: 'Tên Z-A' },
  { value: 'price|ASC', label: 'Giá thấp đến cao' },
  { value: 'price|DESC', label: 'Giá cao đến thấp' },
];

interface ProductFilterHeaderProps {
  onSearchChange: (value: string) => void;
  onStatusChange: (value: 'active' | 'inactive' | 'all') => void;
  onSortChange: (value: string) => void;
  onProductTypeChange: (productTypeId: number | undefined) => void;
  onPriceRangeChange: (minPrice: number | undefined, maxPrice: number | undefined) => void;
  onClearFilters: () => void;
  currentStatus: string;
  currentSort: string;
  currentProductTypeId?: number;
  currentMinPrice?: number;
  currentMaxPrice?: number;
}

const ProductFilterHeader = ({
  onSearchChange,
  onStatusChange,
  onSortChange,
  onProductTypeChange,
  onPriceRangeChange,
  onClearFilters,
  currentStatus,
  currentSort,
  currentProductTypeId,
  currentMinPrice,
  currentMaxPrice,
}: ProductFilterHeaderProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [minPrice, setMinPrice] = useState<string>(currentMinPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState<string>(currentMaxPrice?.toString() || '');

  // Fetch product types
  const { data: productTypesData } = useGetProductTypesQuery({
    status: 'active',
    limit: 100,
  });

  const productTypes = (productTypesData?.data?.product_types || []) as ProductType[];

  // Debounce effect cho search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, onSearchChange]);

  // Debounce effect cho price range
  useEffect(() => {
    const timer = setTimeout(() => {
      const min = minPrice ? parseFloat(minPrice) : undefined;
      const max = maxPrice ? parseFloat(maxPrice) : undefined;
      onPriceRangeChange(min, max);
    }, 800);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, onPriceRangeChange]);

  const handleSortChange = (value: string) => {
    onSortChange(value);
  };

  const handleProductTypeChange = (value: string) => {
    if (value === 'all') {
      onProductTypeChange(undefined);
    } else {
      onProductTypeChange(parseInt(value));
    }
  };

  const handleClearAll = () => {
    setSearchInput('');
    setMinPrice('');
    setMaxPrice('');
    onClearFilters();
  };

  const hasActiveFilters =
    searchInput ||
    currentProductTypeId ||
    currentMinPrice ||
    currentMaxPrice ||
    currentStatus !== 'all';

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="space-y-3">
        {/* Row 1: Search, Status, Sort */}
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm theo tên sản phẩm..."
                className="pl-10"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <div className="w-48">
            <Select
              value={currentStatus}
              onValueChange={value => onStatusChange(value as 'active' | 'inactive' | 'all')}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-56">
            <Select value={currentSort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 2: Product Type, Price Range, Clear Button */}
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="text-xs font-medium text-gray-600 mb-1 block">Loại sản phẩm</label>
            <Select
              value={currentProductTypeId?.toString() || 'all'}
              onValueChange={handleProductTypeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tất cả loại sản phẩm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại sản phẩm</SelectItem>
                {productTypes.map(pt => (
                  <SelectItem key={pt.product_type_id} value={pt.product_type_id.toString()}>
                    {pt.product_type_name_vn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-48">
            <label className="text-xs font-medium text-gray-600 mb-1 block">Giá từ (VNĐ)</label>
            <Input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              min="0"
            />
          </div>
          <div className="w-48">
            <label className="text-xs font-medium text-gray-600 mb-1 block">Giá đến (VNĐ)</label>
            <Input
              type="number"
              placeholder="Không giới hạn"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              min="0"
            />
          </div>
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
            >
              <X className="h-4 w-4 mr-1" />
              Xóa bộ lọc
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilterHeader;
