
export const STATUS_OPTIONS = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Không hoạt động' },
];

export const INITIAL_FORM_DATA = {
  categoryNameVn: '',
  descriptionVn: '',
  status: '',
  categoryImage: null,
};

export const SORT_BY_OPTIONS = [
  { value: 'created_at|DESC', label: 'Mới nhất' },
  { value: 'created_at|ASC', label: 'Cũ nhất' },
  { value: 'category_name_vn|ASC', label: 'Tên A-Z' },
  { value: 'category_name_vn|DESC', label: 'Tên Z-A' },
];
