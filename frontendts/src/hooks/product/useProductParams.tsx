import { useLocation, useSearch } from '@tanstack/react-router';

export const useProductParams = () => {
  const location = useLocation();
  const search = useSearch({ strict: false });

  const parseSlugId = (param: string | undefined) => {
    if (!param) return { slug: '', id: '' };

    const parts = param.split('-');
    const id = parts[parts.length - 1];
    const slug = parts.slice(0, -1).join('-');
    return { slug, id };
  };

  // Parse pathname to detect route structure
  // Structure: /product/category-id/subcategory-id or /product/category-id/subcategory-id/producttype-id
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const categoryParam = pathSegments[1]; // noi-that-gia-dinh-1
  const subcategoryParam = pathSegments[2]; // phong-khach-1
  const productTypeParam = pathSegments[3]; // ban-tra-5 (optional)

  const category = parseSlugId(categoryParam);
  const subcategory = parseSlugId(subcategoryParam);
  const productType = parseSlugId(productTypeParam);

  // Extract search params
  const searchParams = search as Record<string, string | number>;

  const filters = {
    min_price: searchParams.min_price ? Number(searchParams.min_price) : undefined,
    max_price: searchParams.max_price ? Number(searchParams.max_price) : undefined,
    sort_by: searchParams.sort_by as string,
    sort_order: searchParams.sort_order as string,
    page: searchParams.page ? Number(searchParams.page) : 1,
    limit: searchParams.limit ? Number(searchParams.limit) : 10,
    product_name_vn: searchParams.product_name_vn as string,
  };

  return {
    category,
    subcategory,
    productType,
    hasProductType: !!productTypeParam,
    filters, // Include search params
  };
};
