export interface Category {
  category_id: number;
  category_name_vn: string;
  status: 'active' | 'inactive';
}
export interface ProductType {
  product_type_id: number;
  subcategory_id: number;
  product_type_name_vn: string;
  status: 'active' | 'inactive';
}

export interface Subcategories {
  subcategory_id: number;
  subcategory_name_vn: string;
  description_vn: string;
  image_url: string;
  status: 'active' | 'inactive';
  product_types: ProductType[];
  categoriy: Category;
}
export interface Product {
  product_id: number;
  product_name_vn: string;
  description_vn: string;
  price: number;
  image_url: string;
  status: 'active' | 'inactive';
  product_type: ProductType;
}
