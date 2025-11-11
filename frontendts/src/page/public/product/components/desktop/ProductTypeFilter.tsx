import React, { useEffect, useState } from 'react';
import { useProductParams } from '../../../../../hooks/product/useProductParams';
import { generateProductUrl } from '../../../../../utils/productUrl';
import type { Subcategories } from '../../type.ts';

interface ProductTypeFilterProps {
  subcategories: Subcategories;
  onProductTypeChange: (productTypeId: number) => void;
}

const ProductTypeFilter: React.FC<ProductTypeFilterProps> = ({
  subcategories,
  onProductTypeChange,
}) => {
  const { category, subcategory, productType, hasProductType } = useProductParams();
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

    // First call the parent handler for filtering - this will update the hook state
    onProductTypeChange(newSelectedId || 0);

    // Then handle URL navigation with preserved search params
    const searchParams = preserveSearchParams();

    if (newSelectedId) {
      // Navigate to long URL with product type
      const selectedProductType = subcategories.product_types.find(
        pt => pt.product_type_id === newSelectedId
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

  return (
    <div className="w-full flex">
      <div
        role="radiogroup"
        aria-label="Product types"
        className="flex flex-row flex-wrap items-center gap-2"
      >
        {subcategories.product_types.map(productType => {
          const id = productType.product_type_id;
          const selected = selectedId === id;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => handleSelect(id)}
              className={`inline-flex items-center justify-center px-4 py-2 min-w-[100px] h-10 rounded-lg transition-all text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 ${
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
