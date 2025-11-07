import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { STATUS_OPTIONS, SORT_BY_OPTIONS } from '@/constants/categoryConstants';
import type { CategoryQuery } from '@/types/category.type';

interface FilterHeaderProps {
  query: CategoryQuery;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: 'active' | 'inactive' | 'all') => void;
  onSortChange: (value: string) => void;
}

const FilterHeader = ({
  query,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: FilterHeaderProps) => {
  const [searchInput, setSearchInput] = useState(query.category_name_vn || '');

  // Debounce effect cho search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchInput);
    }, 500); // 0.5 giây delay

    return () => clearTimeout(timer);
  }, [searchInput, onSearchChange]);

  // Sync khi query thay đổi từ bên ngoài (reset, etc.)
  useEffect(() => {
    setSearchInput(query.category_name_vn || '');
  }, [query.category_name_vn]);
  
  const currentSortValue = `${query.sort_by}|${query.sort_order}`;

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="filter-search"
              placeholder="Tìm theo tên danh mục..."
              className="pl-10"
              value={searchInput} // Sử dụng state local thay vì query
              onChange={e => setSearchInput(e.target.value)} // Cập nhật local state
            />
          </div>
        </div>
        <div className="w-56">
          <Select
            value={query.status || 'all'}
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
          <Select value={currentSortValue} onValueChange={onSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn tùy chọn sắp xếp" />
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
      </div>
    </div>
  );
};

export default FilterHeader;
