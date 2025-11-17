import { useGetProductTypesQuery } from '@/services/api/productTypeApi.ts';
import type { Pagination } from '@/types/common.types';
import type { ProductTypeQuery } from '@/types/product-type.type';
import { useCallback, useEffect, useState } from 'react';

const INITIAL_QUERY: ProductTypeQuery = {
  status: 'all',
  subcategory_id: '',
  product_type_name_vn: '',
  page: 1,
  limit: 10,
  sort_by: 'created_at',
  sort_order: 'ASC',
};

export const useGetProductTypes = () => {
  // === STATE QUẢN LÝ TRUY VẤN & PHÂN TRANG ===
  const [query, setQuery] = useState<ProductTypeQuery>(INITIAL_QUERY);

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // === LỌC BỎ GIÁ TRỊ RỖNG TRƯỚC KHI GỬI API ===
  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(([key, value]) => {
      if (key === 'status' && value === 'all') return false;
      return value !== '' && value !== null && value !== undefined;
    })
  ) as Partial<ProductTypeQuery>;

  // === GỌI API ===
  const { data, isLoading, error, refetch } = useGetProductTypesQuery(filteredQuery);

  // === CẬP NHẬT PHÂN TRANG KHI DỮ LIỆU THAY ĐỔI ===
  useEffect(() => {
    console.log('Product Type API response:', data);
    console.log('Current query:', query);
    console.log('Filtered query sent to API:', filteredQuery);

    if (data?.data?.pagination) {
      setPagination(data.data.pagination);
    }

    if (error) {
      console.error('Error fetching product types:', error);
    }
  }, [data, error]);

  // === HANDLER: THAY ĐỔI TRANG ===
  const handlePageChange = useCallback((newPage: number) => {
    setQuery(prev => ({
      ...prev,
      page: newPage,
    }));
  }, []);

  // === HANDLER: THAY ĐỔI LIMIT ===
  const handleLimitChange = useCallback((newLimit: number) => {
    setQuery(prev => ({
      ...prev,
      limit: newLimit,
      page: 1,
    }));
  }, []);

  // === HANDLER: SẮP XẾP ===
  const handleSortChange = useCallback((sortValue: string) => {
    const [sort_by, sort_order] = sortValue.split('|') as [
      'product_type_name_vn' | 'created_at',
      'ASC' | 'DESC',
    ];
    setQuery(prev => ({
      ...prev,
      sort_by,
      sort_order,
      page: 1,
    }));
  }, []);

  // === HANDLER: TÌM KIẾM THEO TÊN LOẠI SẢN PHẨM ===
  const handleSearchChange = useCallback((searchValue: string) => {
    setQuery(prev => ({
      ...prev,
      product_type_name: searchValue,
      page: 1,
    }));
  }, []);

  // === HANDLER: TRẠNG THÁI (active/inactive/all) ===
  const handleStatusChange = useCallback((status: 'active' | 'inactive' | 'all') => {
    setQuery(prev => ({
      ...prev,
      status,
      page: 1,
    }));
  }, []);

  // === HANDLER: CHỌN DANH MỤC CON ===
  const handleSubcategoryChange = (value: string) => {
    setQuery(prev => ({
      ...prev,
      subcategory_id: value === 'all' ? undefined : parseInt(value),
      page: 1,
    }));
  };

  // === HANDLER: RESET TRUY VẤN ===
  const handleRefreshQuery = useCallback(() => {
    setQuery(INITIAL_QUERY);
    setPagination({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    });
  }, []);

  // === TRẢ RA KẾT QUẢ ===
  return {
    query,
    pagination,
    productTypes: data?.data?.product_types || [],
    isLoading,
    error,
    refetch,
    handlePageChange,
    handleLimitChange,
    handleSortChange,
    handleSearchChange,
    handleStatusChange,
    handleSubcategoryChange,
    handleRefreshQuery,
  };
};
