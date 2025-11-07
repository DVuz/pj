import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Subcategory } from '@/types/subcategory.type';
import type { ProductTypeQuery } from '@/types/product-type.type';
import { RefreshCw, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useGetSubcategoriesQuery } from '@/services/api/subcategoryApi.ts';

// Product Type specific constants
const STATUS_OPTIONS = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Vô hiệu' },
];

const SORT_BY_OPTIONS = [
  { value: 'product_type_name_vn|ASC', label: 'Tên A-Z' },
  { value: 'product_type_name_vn|DESC', label: 'Tên Z-A' },
  { value: 'created_at|DESC', label: 'Mới nhất' },
  { value: 'created_at|ASC', label: 'Cũ nhất' },
];

interface FilterPTHeaderProps {
  query: ProductTypeQuery;
  onSearchChange: (value: string) => void;
  onSubcategoryChange: (value: string) => void;
  onStatusChange: (value: 'active' | 'inactive' | 'all') => void;
  onSortChange: (value: string) => void;
  onRefreshFilters?: () => void;
}

const FilterPTHeader = ({
  query,
  onSearchChange,
  onSubcategoryChange,
  onStatusChange,
  onSortChange,
  onRefreshFilters,
}: FilterPTHeaderProps) => {
  const { data } = useGetSubcategoriesQuery('');
  const subcategories = data?.data?.subcategories || [];

  const [searchInput, setSearchInput] = useState(query.product_type_name_vn || '');

  // Debounce tìm kiếm
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, onSearchChange]);

  // Cập nhật ô tìm kiếm khi query thay đổi từ bên ngoài
  useEffect(() => {
    setSearchInput(query.product_type_name_vn || '');
  }, [query.product_type_name_vn]);

  const currentSortValue = `${query.sort_by}|${query.sort_order}`;

  return (
    <div className="bg-white p-4 rounded-md shadow-sm overflow-auto">
      <div className="flex gap-4 items-end">
        {/* Ô tìm kiếm */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="filter-search"
              placeholder="Tìm theo tên loại sản phẩm..."
              className="pl-10"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        {/* Lọc theo danh mục con */}
        <div className="w-56">
          <Select
            value={query.subcategory_id?.toString() || 'all'}
            onValueChange={onSubcategoryChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Lọc theo danh mục con" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectItem value="all">Tất cả danh mục con</SelectItem>
              {subcategories.map((subcategory: Subcategory) => (
                <SelectItem
                  key={subcategory.subcategory_id}
                  value={subcategory.subcategory_id.toString()}
                >
                  {subcategory.subcategory_name_vn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Lọc theo trạng thái */}
        <div className="w-56">
          <Select
            value={query.status || 'all'}
            onValueChange={value => onStatusChange(value as 'active' | 'inactive' | 'all')}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Lọc theo trạng thái" />
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

        {/* Sắp xếp theo */}
        <div className="w-56">
          <Select value={currentSortValue} onValueChange={onSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              {SORT_BY_OPTIONS.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Nút làm mới */}
        <button
          className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
          onClick={onRefreshFilters}
          title="Làm mới bộ lọc"
        >
          <RefreshCw className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default FilterPTHeader;
