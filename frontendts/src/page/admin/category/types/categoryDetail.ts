/**
 * Định nghĩa cho kích thước sản phẩm
 */
interface Dimensions {
  length: number;
  width: number;
  height: number;
}

/**
 * Định nghĩa cho một sản phẩm
 */
export interface Product {
  product_id: number;
  product_code: string;
  product_name_vn: string;
  main_image: string;
  /**
   * Chú ý: Đây là một chuỗi JSON (JSON stringified array).
   * Bạn cần dùng JSON.parse(sub_image) để lấy mảng các hình ảnh.
   * Ví dụ: "[\"path/to/img1.jpg\"]"
   */
  sub_image: string;
  dimensions: Dimensions;
  material_vn: string;
  description_vn: string;
  origin_vn: string;
  color_vn: string;
  public_date: string; // Kiểu ISO 8601 Date string
  status: string; // "hidden" | "visible"
  warranty_period: number;
  price: number;
  created_at: string; // Kiểu ISO 8601 Date string
  updated_at: string; // Kiểu ISO 8601 Date string
}

/**
 * Định nghĩa cho một loại sản phẩm (Product Type)
 */
export interface ProductType {
  product_type_id: number;
  product_type_name_vn: string;
  description_vn: string;
  image_url: string;
  status: string; // "active"
  created_at: string; // Kiểu ISO 8601 Date string
  updated_at: string | null; // Có thể là null
  products: Product[];
  product_count: number;
  active_product_count: number;
}

/**
 * Định nghĩa cho một danh mục con (Subcategory)
 */
interface Subcategory {
  subcategory_id: number;
  subcategory_name_vn: string;
  description_vn: string;
  image_url: string;
  status: string; // "active"
  created_at: string; // Kiểu ISO 8601 Date string
  updated_at: string; // Kiểu ISO 8601 Date string
  product_types: ProductType[];
  product_type_count: number;
  active_product_type_count: number;
  total_product_count: number;
  active_product_count: number;
}

/**
 * Định nghĩa cho dữ liệu thống kê
 */
export interface Statistics {
  total_subcategories: number;
  active_subcategories: number;
  total_product_types: number;
  active_product_types: number;
  total_products: number;
  active_products: number;
}

/**
 * Đây là type gốc cho toàn bộ đối tượng `data`
 */
export interface CategoryDetailData {
  category_id: number;
  category_name_vn: string;
  description_vn: string;
  image_url: string;
  status: string; // "active"
  created_at: string; // Kiểu ISO 8601 Date string
  updated_at: string; // Kiểu ISO 8601 Date string
  subcategories: Subcategory[];
  statistics: Statistics;
}