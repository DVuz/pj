import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SORT_BY_OPTIONS, STATUS_OPTIONS } from '../../../constants/categoryConstants.ts';

import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Label } from '../../ui/label';

// Interface cho filters
interface CategoryFilters {
  category_name_vn?: string;
  status?: string;
  sort_by?: string;
  sort_order?: string;
  page?: number;
  limit?: number;
}

interface ShowCategoryHeaderProps {
  onFiltersChange: (filters: CategoryFilters) => void;
}

// Xóa dòng này: const statusOptionsWithAll: STATUS_OPTIONS

const ShowCategoryHeader: React.FC<ShowCategoryHeaderProps> = ({ onFiltersChange }) => {
  const [category_name_vn, setCategoryName] = useState<string>('');
  const [status, setStatus] = useState<string>('all'); // Đổi default từ '' thành 'all'
  const [sortBy, setSortBy] = useState<string>('');
  
  // Sử dụng useRef để tránh re-render
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onFiltersChangeRef = useRef(onFiltersChange);
  
  // Update ref khi prop thay đổi
  useEffect(() => {
    onFiltersChangeRef.current = onFiltersChange;
  }, [onFiltersChange]);
  
  // Debounce function cho search
  const debouncedSendFilters = (filters: CategoryFilters) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      if (onFiltersChangeRef.current) {
        onFiltersChangeRef.current(filters);
      }
    }, 500);
  };
  
  // Gửi filters ngay lập tức (cho select)
  const sendFiltersImmediate = (filters: CategoryFilters) => {
    if (onFiltersChangeRef.current) {
      onFiltersChangeRef.current(filters);
    }
  };
  
  // Build filters object
  const buildFilters = (
    overrides: Partial<CategoryFilters> & { sortBy?: string } = {}
  ): CategoryFilters => {
    const [sort_by, sort_order] = (overrides.sortBy ?? sortBy).split('|');
    
    // Xử lý status để chuyển 'all' thành undefined (không filter)
    const statusValue = overrides.status !== undefined ? overrides.status : status;
    const processedStatus = statusValue === 'all' ? undefined : statusValue;
    
    return {
      category_name_vn:
        overrides.category_name_vn !== undefined ? overrides.category_name_vn : category_name_vn,
      status: processedStatus,
      sort_by: sort_by,
      sort_order: sort_order,
      page: 1,
      limit: 10,
    };
  };
  
  // Cleanup timer
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategoryName(value);
    debouncedSendFilters(buildFilters({ category_name_vn: value }));
  };
  
  // Handle status change
  const handleStatusChange = (value: string) => {
    setStatus(value);
    sendFiltersImmediate(buildFilters({ status: value }));
  };
  
  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value);
    sendFiltersImmediate(buildFilters({ sortBy: value }));
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Quản lý danh mục</h1>
      
      <div className="flex gap-4 items-end">
        {/* Search Input */}
        <div className="flex-[2] space-y-2">
          <Label htmlFor="search">Tìm kiếm</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="search"
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={category_name_vn}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Status Filter */}
        <div className="flex-1 space-y-2">
          <Label>Trạng thái</Label>
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn trạng thái..." />
            </SelectTrigger>
            <SelectContent>
              {/* Thay statusOptionsWithAll bằng STATUS_OPTIONS */}
              {STATUS_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Sort By */}
        <div className="flex-1 space-y-2">
          <Label>Sắp xếp theo</Label>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_BY_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ShowCategoryHeader;
