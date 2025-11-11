/**
 * Helper functions để generate product URLs
 */

/**
 * Chuyển đổi text tiếng Việt thành slug
 */
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD') // Chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
    .replace(/[đĐ]/g, 'd') // Chuyển đ thành d
    .replace(/[^a-z0-9\s-]/g, '') // Xóa ký tự đặc biệt
    .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, '-') // Xóa dấu gạch ngang dư thừa
    .trim(); // Xóa khoảng trắng đầu cuối
};

/**
 * Generate URL cho subcategory
 */
export const generateSubcategoryUrl = (
  categoryNameVn: string,
  categoryId: number,
  subcategoryNameVn: string,
  subcategoryId: number
): string => {
  const categorySlug = createSlug(categoryNameVn);
  const subcategorySlug = createSlug(subcategoryNameVn);

  return `/product/${categorySlug}-${categoryId}/${subcategorySlug}-${subcategoryId}/`;
};

/**
 * Generate URL ngắn (chỉ có category và subcategory)
 */
export const generateShortProductUrl = (
  categorySlug: string,
  categoryId: number,
  subcategorySlug: string,
  subcategoryId: number
) => {
  return `/product/${categorySlug}-${categoryId}/${subcategorySlug}-${subcategoryId}/`;
};

/**
 * Generate URL dài (có cả product type)
 */
export const generateLongProductUrl = (
  categorySlug: string,
  categoryId: number,
  subcategorySlug: string,
  subcategoryId: number,
  productTypeSlug: string,
  productTypeId: number
) => {
  return `/product/${categorySlug}-${categoryId}/${subcategorySlug}-${subcategoryId}/${productTypeSlug}-${productTypeId}`;
};

/**
 * Generate URL linh hoạt - tự động chọn ngắn hoặc dài
 */
export const generateProductUrl = (
  categorySlug: string,
  categoryId: number,
  subcategorySlug: string,
  subcategoryId: number,
  productTypeSlug?: string,
  productTypeId?: number
) => {
  if (productTypeSlug && productTypeId) {
    return generateLongProductUrl(
      categorySlug,
      categoryId,
      subcategorySlug,
      subcategoryId,
      productTypeSlug,
      productTypeId
    );
  }

  return generateShortProductUrl(categorySlug, categoryId, subcategorySlug, subcategoryId);
};

// Usage examples:
// Short URL: generateProductUrl('noi-that-gia-dinh', 1, 'phong-khach', 1)
// → /product/noi-that-gia-dinh-1/phong-khach-1/

// Long URL: generateProductUrl('noi-that-gia-dinh', 1, 'phong-khach', 1, 'ban-tra', 5)
// → /product/noi-that-gia-dinh-1/phong-khach-1/ban-tra-5
