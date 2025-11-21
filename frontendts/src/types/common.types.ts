export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface Product {
    product_id: number;
    product_code: string;
    product_name_vn: string;
    main_image: string;
    sub_images: string[];
    length: number;
    height: number;
    width: number;
    material_vn: string;
    description_vn: string;
    origin_vn: string;
    color_vn: string;
    product_type_id: number;
    status: 'active' | 'inactive';
    warranty_period: number;
    price: number;
    created_at: string;
    updated_at: string;
    product_type_name_vn: string;
    subcategory_id: number;
    subcategory_name_vn: string;
    category_id: number;
    category_name_vn: string;
}
    export interface ProductQuery {
    product_name_vn?: string;
    category_id: number;
    subcategory_id?: number;
    product_type_id?: number;
    min_price?: number;
    max_price?: number;
    sort_by?: string;
    sort_order?: string;
    page?: number;
    limit?: number;
    status?: 'active' | 'inactive' | 'all';
}