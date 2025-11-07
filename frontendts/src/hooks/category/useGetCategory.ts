import { useState, useCallback, useEffect } from 'react';
import type { Pagination } from '../../types/common.types';
import type { CategoryQuery } from '@/types/category.type';
import { useGetCategoriesQuery } from '@/services/api/categoryApi';

export const useGetCategory = () => {
  const [query, setQuery] = useState<CategoryQuery>({
    status: 'all',
    category_name_vn: '',
    page: 1,
    limit: 10,
    sort_by: 'created_at',
    sort_order: 'ASC',
  });

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Filter out empty values before sending to API
  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(([key, value]) => {
      // Loại bỏ status nếu là 'all', và loại bỏ các giá trị rỗng khác
      if (key === 'status' && value === 'all') return false;
      return value !== null && value !== undefined && value !== '';
    })
  ) as Partial<CategoryQuery>;

  // Connect to the API using RTK Query
  const { data, isLoading, error } = useGetCategoriesQuery(filteredQuery);

  // Log data to console whenever it changes
  useEffect(() => {
    console.log('Category API response:', data);
    console.log('Current query:', query);
    console.log('Filtered query sent to API:', filteredQuery);

    // Update pagination from API response
    if (data?.data?.pagination) {
      setPagination(data.data.pagination);
    }

    if (error) {
      console.error('Error fetching categories:', error);
    }
  }, [data, error]);

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

  // New filter handlers
  const handleSearchChange = useCallback((searchValue: string) => {
    setQuery(prev => ({
      ...prev,
      category_name_vn: searchValue,
      page: 1, // Reset to page 1 when searching
    }));
  }, []);

  const handleStatusChange = useCallback((status: 'active' | 'inactive' | 'all') => {
    setQuery(prev => ({
      ...prev,
      status,
      page: 1, // Reset to page 1 when filtering
    }));
  }, []);

  const handleSortChange = useCallback((sortValue: string) => {
    const [sort_by, sort_order] = sortValue.split('|'); // Đổi từ '_' thành '|'
    setQuery(prev => ({
      ...prev,
      sort_by: sort_by as 'category_name_vn' | 'created_at',
      sort_order: sort_order as 'ASC' | 'DESC',
      page: 1, // Reset to page 1 when sorting
    }));
  }, []);

  return {
    query,
    pagination,
    data: data?data?.data?.categories || []:[],
    isLoading,
    error,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
    handleStatusChange,
    handleSortChange,
  };
};
