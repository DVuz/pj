import { useState, useCallback } from 'react';
import { useGetCategoriesQuery } from '../../services/api/categoryApi';

// Interface cho filters
interface CategoryFilters {
  category_name_vn?: string;
  status?: string;
  sort_by?: string;
  sort_order?: string;
  page?: number;
  limit?: number;
}

// Interface cho category
interface Category {
  id: number;
  categoryNameVn: string;
  descriptionVn: string;
  status: string;
  categoryImage?: string;
  created_at: string;
  updated_at: string;
}

// Interface cho pagination
interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Interface cho API response
interface CategoryApiResponse {
  data: {
    categories: Category[];
    pagination: Pagination;
  };
}

export const useCategoryList = () => {
  const [filters, setFilters] = useState<CategoryFilters>({
    page: 1,
    limit: 10,
    sort_by: 'created_at',
    sort_order: 'DESC',
  });

  const { data, isLoading, error, refetch } = useGetCategoriesQuery(filters);
  const apiData = data as CategoryApiResponse | undefined;

  // Console log kết quả
  console.log('=== CATEGORY LIST HOOK DEBUG ===');
  console.log('Current filters:', filters);
  console.log('Raw API Response:', data);
  console.log('Parsed API Data:', apiData);
  console.log('Categories:', apiData?.data?.categories);
  console.log('Pagination:', apiData?.data?.pagination);
  console.log('Loading:', isLoading);
  console.log('Error:', error);

  // Handle filters change
  const handleFiltersChange = useCallback((newFilters: CategoryFilters) => {
    // Loại bỏ các trường rỗng và 'all' values
    const cleanFilters = Object.fromEntries(
      Object.entries(newFilters).filter(
        ([, value]) => value !== '' && value !== null && value !== undefined && value !== 'all'
      )
    ) as CategoryFilters;

    console.log('New filters before clean:', newFilters);
    console.log('Clean filters applied:', cleanFilters);

    setFilters(cleanFilters);
  }, []);

  // Handle page change
  const handlePageChange = useCallback((newPage: number) => {
    console.log('Page changed to:', newPage);
    setFilters(prev => ({
      ...prev,
      page: newPage,
    }));
  }, []);

  // Handle items per page change
  const handleItemsPerPageChange = useCallback((newLimit: number) => {
    console.log('Items per page changed to:', newLimit);
    setFilters(prev => ({
      ...prev,
      limit: newLimit,
      page: 1, // Reset về trang đầu
    }));
  }, []);

  // Computed values
  const categories = apiData?.data?.categories || [];
  const pagination = apiData?.data?.pagination;
  const totalPages =
    pagination?.totalPages || (pagination ? Math.ceil(pagination.total / pagination.limit) : 1);

  return {
    // Data
    categories,
    pagination,
    totalPages,

    // Loading states
    isLoading,
    error,

    // Filter state
    filters,

    // Actions
    handleFiltersChange,
    handlePageChange,
    handleItemsPerPageChange,
    refetch,

    // Raw data for debugging
    rawApiResponse: data,
    apiData,
  };
};
