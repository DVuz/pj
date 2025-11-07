import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../ui/select';
import { STATUS_OPTIONS, SORT_BY_OPTIONS } from '../../../constants/categoryConstants';

const statusOptions = [{ value: 'all', label: 'Tất cả trạng thái' }, ...STATUS_OPTIONS];

const FilterHeader: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="filter-search" className="mb-1">
            Tìm kiếm
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input id="filter-search" placeholder="Tìm theo tên danh mục..." className="pl-10" />
          </div>
        </div>

        <div className="w-56">
          <Label className="mb-1">Trạng thái</Label>
          <Select defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-56">
          <Label className="mb-1">Sắp xếp</Label>
          <Select defaultValue="createdAt|DESC">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sắp xếp" />
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
