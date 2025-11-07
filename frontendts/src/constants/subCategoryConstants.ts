export const STATUS_OPTIONS = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Không hoạt động' },
];

export const INITIAL_SUBCATEGORY_FORM_DATA = {
  categoryId: 0,
  subcategoryNameVn: '',
  descriptionVn: '',
  status: '',
  subcategoryImage: null,
};

export const SET_ACTIVE_OPTIONS = [
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Không hoạt động' },
];
export const SORT_BY_OPTIONS = [
  { value: 'created_at|DESC', label: 'Mới nhất' },
  { value: 'created_at|ASC', label: 'Cũ nhất' },
  { value: 'subcategory_name_vn|ASC', label: 'Tên A-Z' },
  { value: 'subcategory_name_vn|DESC', label: 'Tên Z-A' },
];
