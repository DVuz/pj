// ...existing code...
import type { Pagination } from './common.types.ts';

export type VisibilityStatus = 'visible' | 'hidden' | string;
export type ActiveStatus = 'active' | 'inactive' | string;

export interface CategoryShort {
  category_id: number;
  category_name_vn: string;
  image_url?: string | null;
  status?: ActiveStatus;
}

export interface SubcategoryShort {
  subcategory_id: number;
  category_id?: number;
  subcategory_name_vn: string;
  description_vn?: string | null;
  image_url?: string | null;
  subcategory_image_url?: string | null; // some responses use this name
  status?: ActiveStatus | string;
  created_at?: string | null;
  product_type_count?: number;
  active_product_type_count?: number;

  // category info may be nested or flattened on the subcategory object
  category?: CategoryShort | null;
  category_name_vn?: string;
  category_image_url?: string | null;
  category_status?: ActiveStatus | string;
}

export interface Product {
  product_id: number;
  product_code?: string;
  product_name_vn?: string;
  main_image?: string | null;
  status?: VisibilityStatus | string;
  product_type_id?: number;
}

export interface ProductType {
  product_type_id: number;
  product_type_name_vn: string;
  description_vn?: string | null;
  image_url?: string | null;
  status?: ActiveStatus | string;
  subcategory_id?: number;
  created_at?: string | null;
  updated_at?: string | null;
  product_count?: number;
  active_product_count?: number;
  // API sometimes returns subcategory as array with single item
  subcategory?: SubcategoryShort[] | null;
  products?: Product[] | null;
}

export interface ProductTypeQuery {
  status?: ActiveStatus | 'all';
  subcategory_id?: string | number;
  product_type_name_vn?: string;
  page?: number;
  limit?: number;
  sort_by?: 'product_type_name_vn' | 'created_at';
  sort_order?: 'ASC' | 'DESC';
}

export interface ProductTypeResponse {
  status: string;
  message: string;
  data: {
    product_types: ProductType[];
    pagination: Pagination;
  };
  source?: string;
}
// ...existing code...
