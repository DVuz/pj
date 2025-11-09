import React, { useRef, useState } from 'react';
import type { ImageUploadRef } from '@/components/admin/ImageUpload';
import { showToast } from '@/utils/toastMessages.ts';
import { useCreateProductMutation } from '@/services/api/productApi.ts';
import type { ProductFormData, FormErrors } from '@/types/product.type.ts';
import { validateProductForm, hasValidationErrors } from '@/utils/validators/productValidator.ts';
import parseErrorMessage from '@/utils/parseErrorMessage.tsx';

const INITIAL_FORM_DATA: ProductFormData = {
	productCode: '',
	productNameVn: '',
	mainImage: null,
	subImages: [],
	length: '',
	width: '',
	height: '',
	materialVn: '',
	descriptionVn: '',
	originVn: '',
	colorVn: '',
	productTypeId: '',
	status: 'active',
	warrantyPeriod: '',
	price: '',
};

export const useProductForm = () => {
	const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA);
	const [errors, setErrors] = useState<FormErrors>({});
	
	const [createProduct, { isLoading }] = useCreateProductMutation();
	
	const mainImageUploadRef = useRef<ImageUploadRef>(null);
	const subImagesUploadRef = useRef<ImageUploadRef>(null);
	
	const handleInputChange = (
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
			| { target: { name?: string; value: unknown } }
	) => {
		const target = e.target as EventTarget & { name?: string; value: unknown };
		const name = target.name as string | undefined;
		let value = target.value;
		
		if (!name) return;
		
		if (typeof value !== 'string') {
			if (Array.isArray(value)) {
				value = value.join(',');
			} else {
				value = value !== undefined && value !== null ? String(value) : '';
			}
		}
		
		setFormData(prev => ({ ...prev, [name]: value as string }));
		
		if (errors[name as keyof FormErrors]) {
			setErrors(prev => ({ ...prev, [name as keyof FormErrors]: '' }));
		}
	};
	
	const handleMainImageChange = (e: {
		target: { name: string; value: File | File[] | null; files: File[] };
	}) => {
		const { value } = e.target;
		
		const file: File | null = Array.isArray(value)
			? value.length > 0
				? (value[0] as File)
				: null
			: (value as File | null);
		
		setFormData(prev => ({ ...prev, mainImage: file }));
		
		if (errors.mainImage) {
			setErrors(prev => ({ ...prev, mainImage: '' }));
		}
	};
	
	const handleSubImagesChange = (e: {
		target: { name: string; value: File | File[] | null; files: File[] };
	}) => {
		const { files } = e.target;
		
		setFormData(prev => ({ ...prev, subImages: files }));
		
		if (errors.subImages) {
			setErrors(prev => ({ ...prev, subImages: '' }));
		}
	};
	
	const resetForm = () => {
		setFormData(INITIAL_FORM_DATA);
		setErrors({});
		mainImageUploadRef.current?.clearAll();
		subImagesUploadRef.current?.clearAll();
	};
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		const validationErrors = validateProductForm(formData);
		
		if (hasValidationErrors(validationErrors)) {
			setErrors(validationErrors);
			showToast({
				message: 'Vui lòng kiểm tra lại thông tin form',
				type: 'error',
			});
			return;
		}
		
		setErrors({});
		
		try {
			const submitData = new FormData();
			submitData.append('productCode', formData.productCode);
			submitData.append('productNameVn', formData.productNameVn);
			submitData.append('length', formData.length);
			submitData.append('width', formData.width);
			submitData.append('height', formData.height);
			submitData.append('materialVn', formData.materialVn);
			submitData.append('descriptionVn', formData.descriptionVn);
			submitData.append('originVn', formData.originVn);
			submitData.append('colorVn', formData.colorVn);
			submitData.append('productTypeId', formData.productTypeId);
			submitData.append('status', formData.status);
			submitData.append('warrantyPeriod', formData.warrantyPeriod);
			submitData.append('price', formData.price);
			
			if (formData.mainImage) {
				submitData.append('mainImage', formData.mainImage);
			}
			
			if (formData.subImages && formData.subImages.length > 0) {
				for (const file of formData.subImages) {
					submitData.append('subImage', file);
				}
			}
			
			await createProduct(submitData).unwrap();
			
			showToast({
				message: 'Tạo sản phẩm thành công',
				type: 'success',
			});
			resetForm();
		} catch (error) {
			console.error('Error creating product:', error);
			const errorMessage = parseErrorMessage(error);
			
			showToast({
				message: errorMessage,
				type: 'error',
			});
		}
	};
	
	return {
		formData,
		errors,
		isLoading,
		mainImageUploadRef,
		subImagesUploadRef,
		handleInputChange,
		handleMainImageChange,
		handleSubImagesChange,
		handleSubmit,
		resetForm,
	};
};
