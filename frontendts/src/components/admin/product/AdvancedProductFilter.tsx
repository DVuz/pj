import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetCategoriesQuery } from '@/services/api/categoryApi';
import { useGetProductTypesQuery } from '@/services/api/productTypeApi';
import { useGetSubcategoriesQuery } from '@/services/api/subcategoryApi';
import type { Category } from '@/types/category.type';
import type { ProductType } from '@/types/product-type.type';
import type { Subcategory } from '@/types/subcategory.type';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AdvancedProductFilterProps {
  onCategoryChange: (categoryId: number | undefined) => void;
  onSubcategoryChange: (subcategoryId: number | undefined) => void;
  onProductTypeChange: (productTypeId: number | undefined) => void;
  onPriceRangeChange: (minPrice: number | undefined, maxPrice: number | undefined) => void;
  onClearFilters: () => void;
  currentCategoryId?: number;
  currentSubcategoryId?: number;
  currentProductTypeId?: number;
  currentMinPrice?: number;
  currentMaxPrice?: number;
}

const AdvancedProductFilter = ({
  onCategoryChange,
  onSubcategoryChange,
  onProductTypeChange,
  onPriceRangeChange,
  onClearFilters,
  currentCategoryId,
  currentSubcategoryId,
  currentProductTypeId,
  currentMinPrice,
  currentMaxPrice,
}: AdvancedProductFilterProps) => {
  const [minPrice, setMinPrice] = useState<string>(currentMinPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState<string>(currentMaxPrice?.toString() || '');

  // Fetch categories
  const { data: categoriesData } = useGetCategoriesQuery({
    status: 'active',
    limit: 100,
  });

  // Fetch subcategories based on selected category
  const { data: subcategoriesData } = useGetSubcategoriesQuery(
    currentCategoryId
      ? {
          category_id: currentCategoryId.toString(),
          status: 'active',
          limit: 100,
        }
      : { status: 'active', limit: 100 },
    {
      skip: !currentCategoryId,
    }
  );

  // Fetch product types based on selected subcategory
  const { data: productTypesData } = useGetProductTypesQuery(
    currentSubcategoryId
      ? {
          subcategory_id: currentSubcategoryId.toString(),
          status: 'active',
          limit: 100,
        }
      : { status: 'active', limit: 100 },
    {
      skip: !currentSubcategoryId,
    }
  );

  const categories = (categoriesData?.data?.categories || []) as Category[];
  const subcategories = (subcategoriesData?.data?.subcategories || []) as Subcategory[];
  const productTypes = (productTypesData?.data?.product_types || []) as ProductType[];

  // Debounce price range changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const min = minPrice ? parseFloat(minPrice) : undefined;
      const max = maxPrice ? parseFloat(maxPrice) : undefined;
      onPriceRangeChange(min, max);
    }, 800);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, onPriceRangeChange]);

  const handleCategoryChange = (value: string) => {
    if (value === 'all') {
      onCategoryChange(undefined);
    } else {
      onCategoryChange(parseInt(value));
    }
  };

  const handleSubcategoryChange = (value: string) => {
    if (value === 'all') {
      onSubcategoryChange(undefined);
    } else {
      onSubcategoryChange(parseInt(value));
    }
  };

  const handleProductTypeChange = (value: string) => {
    if (value === 'all') {
      onProductTypeChange(undefined);
    } else {
      onProductTypeChange(parseInt(value));
    }
  };

  const handleClearAll = () => {
    setMinPrice('');
    setMaxPrice('');
    onClearFilters();
  };

  const hasActiveFilters =
    currentCategoryId ||
    currentSubcategoryId ||
    currentProductTypeId ||
    currentMinPrice ||
    currentMaxPrice;

  return (
    <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Bộ lọc nâng cao</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-3 w-3 mr-1" />
            Xóa bộ lọc
          </Button>
        )}
      </div>

      <div className="grid grid-cols-5 gap-3">
        {/* Category Filter */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">Danh mục</label>
          <Select
            value={currentCategoryId?.toString() || 'all'}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Tất cả danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả danh mục</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat.category_id} value={cat.category_id.toString()}>
                  {cat.category_name_vn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subcategory Filter */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">Danh mục con</label>
          <Select
            value={currentSubcategoryId?.toString() || 'all'}
            onValueChange={handleSubcategoryChange}
            disabled={!currentCategoryId}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Tất cả danh mục con" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả danh mục con</SelectItem>
              {subcategories.map(subcat => (
                <SelectItem key={subcat.subcategory_id} value={subcat.subcategory_id.toString()}>
                  {subcat.subcategory_name_vn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Product Type Filter */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">Loại sản phẩm</label>
          <Select
            value={currentProductTypeId?.toString() || 'all'}
            onValueChange={handleProductTypeChange}
            disabled={!currentSubcategoryId}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Tất cả loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              {productTypes.map(pt => (
                <SelectItem key={pt.product_type_id} value={pt.product_type_id.toString()}>
                  {pt.product_type_name_vn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Min Price Filter */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">Giá từ (VNĐ)</label>
          <Input
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="h-9"
            min="0"
          />
        </div>

        {/* Max Price Filter */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">Giá đến (VNĐ)</label>
          <Input
            type="number"
            placeholder="Không giới hạn"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="h-9"
            min="0"
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedProductFilter;
