import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetCategoriesQuery } from '@/services/api/categoryApi';
import type { Category } from '@/types/category.type';
import type { SubcategoryQuery } from '@/types/subcategory.type';
import { RefreshCw, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SORT_BY_OPTIONS, STATUS_OPTIONS } from '../../../constants/subCategoryConstants.ts';

interface FilterSubcategoryProps {
  query: SubcategoryQuery;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: 'active' | 'inactive' | 'all') => void;
  onSortChange: (value: string) => void;
  onRefreshFilters?: () => void;
}

const FilterSubcategory = ({
  query,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  onRefreshFilters,
}: FilterSubcategoryProps) => {
  const { data } = useGetCategoriesQuery('');
  const categories = data?.data?.categories || [];

  const [searchInput, setSearchInput] = useState(query.subcategory_name_vn || '');

  // Debounce tìm kiếm
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, onSearchChange]);

  // Cập nhật ô tìm kiếm khi query thay đổi từ bên ngoài
  useEffect(() => {
    setSearchInput(query.subcategory_name_vn || '');
  }, [query.subcategory_name_vn]);

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
              placeholder="Tìm theo tên danh mục phụ..."
              className="pl-10"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        {/* Lọc theo danh mục cha */}
        <div className="w-56">
          <Select value={query.category_id?.toString() || ''} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Lọc theo danh mục cha" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {categories.map((category: Category) => (
                <SelectItem key={category.category_id} value={category.category_id.toString()}>
                  {category.category_name_vn}
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

export default FilterSubcategory;
