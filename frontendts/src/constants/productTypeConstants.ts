export const STATUS_OPTIONS = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Không hoạt động' },
];

export const INITIAL_PRODUCT_TYPE_FORM_DATA = {
  subcategoryId: 0,
  productTypeNameVn: '',
  descriptionVn: '',
  status: '',
  productTypeImage: null,
};

export const SET_ACTIVE_OPTIONS = [
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Không hoạt động' },
];

export const SORT_BY_OPTIONS = [
  { value: 'created_at|DESC', label: 'Mới nhất' },
  { value: 'created_at|ASC', label: 'Cũ nhất' },
  { value: 'product_type_name_vn|ASC', label: 'Tên A-Z' },
  { value: 'product_type_name_vn|DESC', label: 'Tên Z-A' },
];
