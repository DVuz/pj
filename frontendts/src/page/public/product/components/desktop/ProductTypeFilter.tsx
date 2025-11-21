import { useGetProductList } from '@/hooks/category/useGetProductList.tsx';
import { useProductParams } from '@/hooks/product/useProductParams.tsx';
import { useGetSubcategoryByIdQuery } from '@/services/api/subcategoryApi.ts';
import { generateProductUrl } from '@/utils/productUrl.ts';
import React, { useEffect, useState } from 'react';

interface ProductType {
  product_type_id: number;
  product_type_name_vn: string;
}

const ProductTypeFilter: React.FC = () => {
  const { category, subcategory, productType, hasProductType } = useProductParams();
  const { handleProductTypeChange } = useGetProductList();
  const { data: subcategoryData } = useGetSubcategoryByIdQuery(subcategory.id);
  const subcategories = subcategoryData?.data;
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Sync selected state with URL params
  useEffect(() => {
    if (hasProductType && productType.id) {
      setSelectedId(parseInt(productType.id));
    } else {
      setSelectedId(null);
    }
  }, [productType.id, hasProductType]);

  const preserveSearchParams = () => {
    // Get current search params from window.location to preserve existing filters
    const currentUrl = new URL(window.location.href);
    const searchParams: Record<string, string> = {};

    currentUrl.searchParams.forEach((value, key) => {
      searchParams[key] = value;
    });

    return searchParams;
  };

  const handleSelect = (id: number) => {
    const newSelectedId = selectedId === id ? null : id;
    setSelectedId(newSelectedId);

    // First call the hook handler for filtering - this will update the hook state
    handleProductTypeChange(newSelectedId || 0);

    // Then handle URL navigation with preserved search params
    const searchParams = preserveSearchParams();

    if (newSelectedId) {
      // Navigate to long URL with product type
      const selectedProductType = subcategories.product_types.find(
        (pt: ProductType) => pt.product_type_id === newSelectedId
      );
      if (selectedProductType) {
        const productTypeSlug = selectedProductType.product_type_name_vn
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-');

        const longUrl = generateProductUrl(
          category.slug,
          parseInt(category.id),
          subcategory.slug,
          parseInt(subcategory.id),
          productTypeSlug,
          newSelectedId
        );

        // Use window.location to preserve search params better
        const newUrl = new URL(longUrl, window.location.origin);
        Object.entries(searchParams).forEach(([key, value]) => {
          newUrl.searchParams.set(key, value);
        });

        window.history.replaceState({}, '', newUrl.toString());
      }
    } else {
      // Navigate back to short URL (remove product type)
      const shortUrl = generateProductUrl(
        category.slug,
        parseInt(category.id),
        subcategory.slug,
        parseInt(subcategory.id)
      );

      // Use window.location to preserve search params better
      const newUrl = new URL(shortUrl, window.location.origin);
      Object.entries(searchParams).forEach(([key, value]) => {
        newUrl.searchParams.set(key, value);
      });

      window.history.replaceState({}, '', newUrl.toString());
    }
  };

  if (!subcategories?.product_types) return null;

  return (
    <div className="w-full">
      <div
        role="radiogroup"
        aria-label="Product types"
        className="flex flex-row flex-wrap items-center gap-2"
      >
        {subcategories.product_types.map((productType: ProductType) => {
          const id = productType.product_type_id;
          const selected = selectedId === id;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => handleSelect(id)}
              className={`inline-flex items-center justify-center px-3 sm:px-4 py-2 min-w-20 sm:min-w-[100px] h-9 sm:h-10 rounded-lg transition-all text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                selected
                  ? 'bg-blue-600 text-white ring-blue-500 shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {productType.product_type_name_vn}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductTypeFilter;
