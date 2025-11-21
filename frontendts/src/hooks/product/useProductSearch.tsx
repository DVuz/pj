import { useCallback, useEffect, useState } from 'react';
import { useGetProductsQuery } from '@/services/api/productApi.ts';

export const useProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce logic: wait 300ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Fetch products based on debounced search term
  const { data, isLoading, error, isFetching } = useGetProductsQuery(
    {
      product_name_vn: debouncedSearchTerm,
      status: 'active',
      limit: 10,
    },
    {
      skip: !debouncedSearchTerm || debouncedSearchTerm.trim().length < 2, // skip if less than 2 characters
    }
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  }, []);

  return {
    searchTerm,
    debouncedSearchTerm,
    products: (data?.data?.products) || [],
    isLoading: isLoading || isFetching,
    error,
    handleSearchChange,
    clearSearch,
    hasResults: debouncedSearchTerm.trim().length >= 2,
  };
};
