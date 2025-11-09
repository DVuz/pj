
export interface ProductFormData {
	productCode: string;
	productNameVn: string;
	mainImage: File | null;
	subImages: File[];
	length: string;
	width: string;
	height: string;
	materialVn: string;
	descriptionVn: string;
	originVn: string;
	colorVn: string;
	productTypeId: string;
	status: string;
	warrantyPeriod: string;
	price: string;
}

export interface FormErrors {
	productCode?: string;
	productNameVn?: string;
	mainImage?: string;
	subImages?: string;
	length?: string;
	width?: string;
	height?: string;
	materialVn?: string;
	descriptionVn?: string;
	originVn?: string;
	colorVn?: string;
	productTypeId?: string;
	status?: string;
	warrantyPeriod?: string;
	price?: string;
}
