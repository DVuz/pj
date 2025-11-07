export interface CategoryFormData {
  categoryNameVn: string;
  descriptionVn: string;
  status: string;
  categoryImage: File | null;
}

export interface FormErrors {
  categoryNameVn?: string;
  descriptionVn?: string;
  status?: string;
  categoryImage?: string;
}
export interface CategoryFilters {
  status?: 'active' | 'inactive' | '';
  category_name_vn?: string;
  sort_by?: 'category_name_vn' | 'created_at';
  sort_order?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}

export interface CategoryQuery {
  status?: 'active' | 'inactive' | 'all';
  category_name_vn?: string;
  page?: number; // default = 1
  limit?: number; // default = 10
  sort_by?: 'category_name_vn' | 'created_at'; // default = 'created_at'
  sort_order?: 'ASC' | 'DESC'; // default = 'ASC'
}
export interface Categories {
  category_id: number;
  category_name_vn: string;
  description_vn: string;
  status: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}
