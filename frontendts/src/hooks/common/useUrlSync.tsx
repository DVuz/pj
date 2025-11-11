import { useCallback } from 'react';

interface FilterParams {
  min_price?: number;
  max_price?: number;
  sort_by?: string;
  sort_order?: string;
  page?: number;
  limit?: number;
  product_name_vn?: string;
}

export const useUrlSync = () => {
  const updateUrlParams = useCallback((newParams: FilterParams) => {
    const url = new URL(window.location.href);

    // Update or remove parameters
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 0) {
        url.searchParams.set(key, String(value));
      } else {
        url.searchParams.delete(key);
      }
    });

    // Update URL without page reload
    window.history.replaceState({}, '', url.toString());
  }, []);

  const resetUrlParams = useCallback((keysToReset: string[]) => {
    const url = new URL(window.location.href);

    keysToReset.forEach(key => {
      url.searchParams.delete(key);
    });

    window.history.replaceState({}, '', url.toString());
  }, []);

  return {
    updateUrlParams,
    resetUrlParams,
  };
};
