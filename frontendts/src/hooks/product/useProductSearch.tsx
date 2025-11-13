import { useCallback, useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../services/api/productApi';

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

export const useProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce logic: Chờ 300ms sau khi user ngừng nhập
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Fetch products chỉ khi có debounced search term
  const { data, isLoading, error, isFetching } = useGetProductsQuery(
    {
      product_name_vn: debouncedSearchTerm,
      status: 'active',
      limit: 10, // Giới hạn 10 kết quả
    },
    {
      skip: !debouncedSearchTerm || debouncedSearchTerm.trim().length < 2, // Skip nếu ít hơn 2 ký tự
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
    products: (data?.data?.products as Product[]) || [],
    isLoading: isLoading || isFetching,
    error,
    handleSearchChange,
    clearSearch,
    hasResults: debouncedSearchTerm.trim().length >= 2,
  };
};
