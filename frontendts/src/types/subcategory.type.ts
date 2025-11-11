import type { Pagination } from './common.types.ts';

export interface SubcategoryFormData {
  categoryId: number;
  subcategoryNameVn: string;
  descriptionVn: string;
  status: string;
  subcategoryImage: File | null;
}

export interface SubcategoryFormErrors {
  categoryId?: string;
  subcategoryNameVn?: string;
  descriptionVn?: string;
  status?: string;
  subcategoryImage?: string;
}
export interface SubcategoryQuery {
  status?: 'active' | 'inactive' | 'all';
  subcategory_name_vn?: string;
  category_id?: string;
  page?: number; // default = 1
  limit?: number; // default = 10
  sort_by?: 'subcategory_name_vn' | 'created_at'; // default = 'created_at'
  sort_order?: 'ASC' | 'DESC'; // default = 'ASC'
}
export interface Subcategory {
  subcategory_id: number;
  category_id: number;
  subcategory_name_vn: string;
  description_vn: string;
  status: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}
export interface GETSubcategorySuccess {
  status: 'success';
  message: 'Get subcategories successfully';
  data: {
    subcategories: Subcategory[];
    pagination: Pagination;
  };
  source: 'db' | 'cache';
}
