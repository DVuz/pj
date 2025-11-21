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
  category: Category;
}
export interface Product {
  product_id: number;
  product_code: string;
  product_name_vn: string;
  main_image: string;
  sub_image: string[];
  length: number;
  width: number;
  height: number;
  material_vn: string;
  description_vn: string;
  origin_vn: string;
  color_vn: string;
  product_type_id: number;
  public_date: string;
  warranty_period: number;
  price: number;
  status: "active" | "inactive";
  category_id: number;
  category_name_vn: string;
  subcategory_id: number;
  subcategory_name_vn: string;
  product_type_name_vn: string;
}