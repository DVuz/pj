export const STATUS_OPTIONS = [
	{ value: 'all', label: 'Tất cả trạng thái' },
	{ value: 'active', label: 'Hoạt động' },
	{ value: 'inactive', label: 'Không hoạt động' },
];

export const SET_VISIBILITY_OPTIONS = [
	{ value: 'visible', label: 'Hoạt động' },
	{ value: 'hidden', label: 'Không hoạt động' },
];

export const SORT_BY_OPTIONS = [
	{ value: 'created_at|DESC', label: 'Mới nhất' },
	{ value: 'created_at|ASC', label: 'Cũ nhất' },
	{ value: 'product_name_vn|ASC', label: 'Tên A-Z' },
	{ value: 'product_name_vn|DESC', label: 'Tên Z-A' },
];

export const INITIAL_PRODUCT_FORM_DATA = {
	productNameVn: '',
	descriptionVn: '',
	price: '',
	discountedPrice: '',
	stockQuantity: '',
	categoryId: 0,
	subcategoryId: 0,
	brandId: 0,
	status: '',
	productImages: [] as File[],
};