import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../components/ui/select';
import { useUrlSync } from '../../../../../hooks/common/useUrlSync';

const sortOptions = [
  { value: 'product_name_vn_ASC', label: 'Tên A-Z', sortBy: 'product_name_vn', sortOrder: 'ASC' },
  { value: 'product_name_vn_DESC', label: 'Tên Z-A', sortBy: 'product_name_vn', sortOrder: 'DESC' },
  { value: 'price_ASC', label: 'Giá thấp đến cao', sortBy: 'price', sortOrder: 'ASC' },
  { value: 'price_DESC', label: 'Giá cao đến thấp', sortBy: 'price', sortOrder: 'DESC' },
  { value: 'created_at_DESC', label: 'Mới nhất', sortBy: 'created_at', sortOrder: 'DESC' },
  { value: 'created_at_ASC', label: 'Cũ nhất', sortBy: 'created_at', sortOrder: 'ASC' },
];

interface SortOrderProps {
  onSortChange: (sortBy: string, sortOrder: string) => void;
  initialSortBy?: string;
  initialSortOrder?: string;
}

const SortOrder: React.FC<SortOrderProps> = ({ onSortChange, initialSortBy, initialSortOrder }) => {
  const { updateUrlParams } = useUrlSync();

  // Determine initial value based on URL params
  const getInitialValue = () => {
    if (initialSortBy && initialSortOrder) {
      const option = sortOptions.find(
        opt => opt.sortBy === initialSortBy && opt.sortOrder === initialSortOrder
      );
      return option?.value || 'created_at_DESC';
    }
    return 'created_at_DESC';
  };

  const handleValueChange = (value: string) => {
    const option = sortOptions.find(opt => opt.value === value);
    if (option) {
      onSortChange(option.sortBy, option.sortOrder);
      // Only update URL if value is different from initial
      const currentValue = getInitialValue();
      if (value !== currentValue) {
        updateUrlParams({ sort_by: option.sortBy, sort_order: option.sortOrder });
      }
    }
  };

  return (
    <Select onValueChange={handleValueChange} value={getInitialValue()}>
      <SelectTrigger className="w-full sm:w-44 h-10 border border-gray-300 text-xs sm:text-sm">
        <SelectValue placeholder="Sắp xếp" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map(opt => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortOrder;
