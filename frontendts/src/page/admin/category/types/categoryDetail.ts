export interface CategoryDetail {
  category_id: number;
  category_name_vn: string;
  description_vn: string;
  image_url: string;
  status: string;
  created_at: string;
  updated_at: string;
  subcategories: SubCategory[];
  statistics: {
    total_subcategories: number;
    active_subcategories: number;
    total_product_types: number;
    active_product_types: number;
    total_products: number;
    active_products: number;
  };
}

export interface SubCategory {
  subcategory_id: number;
  subcategory_name_vn: string;
  description_vn: string;
  image_url: string;
  status: string;
  product_types: ProductType[];
}

export interface ProductType {
  product_type_id: number;
  product_type_name_vn: string;
  image_url: string;
  status: string;
  products: Product[];
  product_count: number;
  active_product_count: number;
}

export interface Product {
  product_id: number;
  product_name_vn: string;
  main_image: string;
  status: string;
}
