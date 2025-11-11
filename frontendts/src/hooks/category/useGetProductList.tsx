import { useCallback, useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../services/api/productApi';
import type { Pagination } from '../../types/common.types';
import { useUrlSync } from '../common/useUrlSync';
import { useProductParams } from '../product/useProductParams';

interface ProductQuery {
  product_name_vn?: string;
  category_id: number;
  subcategory_id?: number;
  product_type_id?: number;
  min_price?: number;
  max_price?: number;
  sort_by?: string;
  sort_order?: string;
  page?: number;
  limit?: number;
  status?: 'active' | 'inactive' | 'all';
}
interface Product {
  product_id: number;
  product_name_vn: string;
  description_vn: string;
  price: number;
  category_id: number;
  subcategory_id: number;
  product_type_id: number;
  main_image: string;
  material_vn: string;
  color_vn: string;
  product_type_name_vn: string;
}

export const useGetProductList = () => {
  const { updateUrlParams } = useUrlSync();
  const { subcategory, category, productType, hasProductType, filters } = useProductParams();

  const [query, setQuery] = useState<ProductQuery>({
    status: 'active',
    category_id: 0,
    subcategory_id: 0,
    product_type_id: 0,
    min_price: 0,
    max_price: 0,
    sort_by: 'created_at',
    sort_order: 'ASC',
    page: 1,
    limit: 10,
    product_name_vn: '',
  });
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Filter out empty values before sending to API
  const shouldIncludeInQuery = (key: string, value: unknown) => {
    // Loại bỏ status nếu là 'all'
    if (key === 'status' && value === 'all') return false;
    // Loại bỏ các giá trị null/undefined/empty string
    if (value === null || value === undefined || value === '') return false;
    // Loại bỏ các giá trị số bằng 0
    if (typeof value === 'number' && value === 0) return false;
    return true;
  };

  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(([key, value]) => shouldIncludeInQuery(key, value))
  ) as Partial<ProductQuery>;

  // Connect to the API using RTK Query
  const { data, isLoading, error } = useGetProductsQuery(filteredQuery);

  // Sync URL params with query state when URL changes
  useEffect(() => {
    setQuery(prev => ({
      ...prev,
      category_id: category.id ? parseInt(category.id) : prev.category_id,
      subcategory_id: subcategory.id ? parseInt(subcategory.id) : prev.subcategory_id,
      product_type_id: hasProductType && productType.id ? parseInt(productType.id) : 0,
      min_price: filters.min_price || 0,
      max_price: filters.max_price || 0,
      sort_by: filters.sort_by || 'created_at',
      sort_order: filters.sort_order || 'ASC',
      page: filters.page || 1,
      limit: filters.limit || 10,
    }));
  }, [
    category.id,
    subcategory.id,
    productType.id,
    hasProductType,
    filters.min_price,
    filters.max_price,
    filters.sort_by,
    filters.sort_order,
    filters.page,
    filters.limit,
  ]);

  // Update pagination when data changes
  useEffect(() => {
    if (data?.data?.pagination) {
      setPagination(data.data.pagination);
    }

    if (error) {
      console.error('Error fetching products:', error);
    }
  }, [data, error]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setQuery(prev => ({
        ...prev,
        page: newPage,
      }));
      // Separate URL update to avoid infinite loops
      setTimeout(() => {
        updateUrlParams({ page: newPage });
      }, 0);
    },
    [updateUrlParams]
  );

  const handleLimitChange = useCallback(
    (newLimit: number) => {
      setQuery(prev => ({
        ...prev,
        limit: newLimit,
        page: 1, // Reset to page 1
      }));
      // Separate URL update to avoid infinite loops
      setTimeout(() => {
        updateUrlParams({ limit: newLimit, page: 1 });
      }, 0);
    },
    [updateUrlParams]
  );

  const handleStatusChange = useCallback((newStatus: 'active' | 'inactive' | 'all') => {
    setQuery(prev => ({
      ...prev,
      status: newStatus,
      page: 1, // Reset to page 1
    }));
  }, []);

  const handleSortChange = useCallback(
    (sortBy: string, sortOrder: string) => {
      setQuery(prev => ({
        ...prev,
        sort_by: sortBy as 'product_name_vn' | 'created_at',
        sort_order: sortOrder as 'ASC' | 'DESC',
      }));
      // Update URL params
      setTimeout(() => {
        updateUrlParams({ sort_by: sortBy, sort_order: sortOrder });
      }, 0);
    },
    [updateUrlParams]
  );
  const handleSearchChange = useCallback((searchValue: string) => {
    setQuery(prev => ({
      ...prev,
      product_name_vn: searchValue,
      page: 1, // Reset to page 1 when searching
    }));
  }, []);
  const handleProductTypeChange = useCallback((productTypeId: number) => {
    setQuery(prev => ({
      ...prev,
      product_type_id: productTypeId,
      page: 1, // Reset to page 1 when filtering
    }));
    // Don't update URL here since ProductTypeFilter handles URL navigation
  }, []);
  const handleSubcategoryChange = useCallback((subcategoryId: number) => {
    setQuery(prev => ({
      ...prev,
      subcategory_id: subcategoryId,
      page: 1, // Reset to page 1 when filtering
    }));
  }, []);
  const handlePriceRangeChange = useCallback(
    (minPrice: number, maxPrice: number) => {
      setQuery(prev => ({
        ...prev,
        min_price: minPrice,
        max_price: maxPrice,
        page: 1, // Reset to page 1 when filtering
      }));
      // Update URL params
      setTimeout(() => {
        updateUrlParams({ min_price: minPrice, max_price: maxPrice });
      }, 0);
    },
    [updateUrlParams]
  );

  const handleCategoryChange = useCallback((categoryId: number) => {
    setQuery(prev => ({
      ...prev,
      category_id: categoryId,
      page: 1, // Reset to page 1 when filtering
    }));
  }, []);

  return {
    products: (data?.data?.products as Product[]) || [],
    isLoading,
    error,
    pagination,
    handlePageChange,
    handleLimitChange,
    handleStatusChange,
    handleSortChange,
    handleSearchChange,
    handleProductTypeChange,
    handleSubcategoryChange,
    handlePriceRangeChange,
    handleCategoryChange,
  };
};
