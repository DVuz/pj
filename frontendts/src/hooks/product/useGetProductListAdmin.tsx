import { useCallback, useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../services/api/productApi';
import type { Pagination } from '../../types/common.types';

interface ProductQueryAdmin {
  product_name_vn?: string;
  category_id?: number;
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
  status: string;
  created_at: string;
}

export const useGetProductListAdmin = () => {
  const [query, setQuery] = useState<ProductQueryAdmin>({
    status: 'active',
    sort_by: 'created_at',
    sort_order: 'DESC',
    page: 1,
    limit: 10,
    // Không set category_id, subcategory_id, product_type_id ở đây
    // Chỉ thêm khi cần filter
  });

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Filter out empty/default values before sending to API
  const shouldIncludeInQuery = (key: string, value: unknown) => {
    // Loại bỏ status nếu là 'all'
    if (key === 'status' && value === 'all') return false;
    // Loại bỏ các giá trị null/undefined/empty string
    if (value === null || value === undefined || value === '') return false;
    // Loại bỏ các giá trị số bằng 0 hoặc NaN
    if (typeof value === 'number' && (value === 0 || isNaN(value))) return false;
    return true;
  };

  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(([key, value]) => shouldIncludeInQuery(key, value))
  ) as Partial<ProductQueryAdmin>;

  console.log('Query before filter:', query);
  console.log('Query after filter:', filteredQuery);

  // Connect to the API using RTK Query - disable retry on error
  const { data, isLoading, error, isFetching } = useGetProductsQuery(filteredQuery, {
    // Tắt hoàn toàn auto-retry và refetch
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
    skip: false, // Không skip query
  });

  // Update pagination when data changes (không theo dõi error để tránh vòng lặp)
  useEffect(() => {
    if (data?.data?.pagination) {
      setPagination(data.data.pagination);
    }

    // Log error nhưng không để trong dependency để tránh re-fetch
    if (error) {
      console.error('Error fetching products:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handlePageChange = useCallback((newPage: number) => {
    setQuery(prev => ({
      ...prev,
      page: newPage,
    }));
  }, []);

  const handleLimitChange = useCallback((newLimit: number) => {
    setQuery(prev => ({
      ...prev,
      limit: newLimit,
      page: 1, // Reset to page 1
    }));
  }, []);

  const handleStatusChange = useCallback((newStatus: 'active' | 'inactive' | 'all') => {
    setQuery(prev => ({
      ...prev,
      status: newStatus,
      page: 1, // Reset to page 1
    }));
  }, []);

  const handleSortChange = useCallback((sortValue: string) => {
    const [sortBy, sortOrder] = sortValue.split('|');
    setQuery(prev => ({
      ...prev,
      sort_by: sortBy,
      sort_order: sortOrder,
      page: 1,
    }));
  }, []);

  const handleSearchChange = useCallback((searchValue: string) => {
    setQuery(prev => ({
      ...prev,
      product_name_vn: searchValue,
      page: 1, // Reset to page 1 when searching
    }));
  }, []);

  const handleCategoryChange = useCallback((categoryId: number | undefined) => {
    setQuery(prev => ({
      ...prev,
      category_id: categoryId,
      subcategory_id: undefined, // Reset subcategory khi đổi category
      product_type_id: undefined, // Reset product type khi đổi category
      page: 1,
    }));
  }, []);

  const handleSubcategoryChange = useCallback((subcategoryId: number | undefined) => {
    setQuery(prev => ({
      ...prev,
      subcategory_id: subcategoryId,
      product_type_id: undefined, // Reset product type khi đổi subcategory
      page: 1,
    }));
  }, []);

  const handleProductTypeChange = useCallback((productTypeId: number | undefined) => {
    setQuery(prev => ({
      ...prev,
      product_type_id: productTypeId,
      page: 1,
    }));
  }, []);

  const handlePriceRangeChange = useCallback(
    (minPrice: number | undefined, maxPrice: number | undefined) => {
      setQuery(prev => ({
        ...prev,
        min_price: minPrice,
        max_price: maxPrice,
        page: 1,
      }));
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setQuery({
      status: 'active',
      sort_by: 'created_at',
      sort_order: 'DESC',
      page: 1,
      limit: 10,
    });
  }, []);

  return {
    products: (data?.data?.products as Product[]) || [],
    isLoading,
    isFetching,
    error,
    pagination,
    query,
    handlePageChange,
    handleLimitChange,
    handleStatusChange,
    handleSortChange,
    handleSearchChange,
    handleCategoryChange,
    handleSubcategoryChange,
    handleProductTypeChange,
    handlePriceRangeChange,
    handleClearFilters,
  };
};
