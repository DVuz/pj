import {Heart, Share2} from 'lucide-react';
import React from 'react';
import type {Product} from '../../type';

interface ProductInfoProps {
	product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({product}) => {
	const formatPrice = (price: number) => {
		return price.toLocaleString('vi-VN') + ' VNĐ';
	};
	
	const formatDimensions = (length: number, width: number, height: number) => {
		return `${length} × ${width} × ${height} cm`;
	};
	
	return (
		<div className="flex flex-col gap-3">
			{/* Category Badge */}
			<div className="inline-flex items-center gap-2">
        <span
	        className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 rounded-md text-xs font-medium">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
	        {product.product_type_name_vn}
        </span>
			</div>
			
			{/* Product Name */}
			<h1 className="text-lg font-bold text-gray-900 leading-tight">{product.product_name_vn}</h1>
			
			{/* Product Code and Actions */}
			<div className="flex items-center justify-between">
				<div className="text-xs text-gray-500">
					Mã sản phẩm: <span className="font-medium text-gray-700">{product.product_code}</span>
				</div>
				<div className="flex items-center gap-2">
					<button
						className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
						aria-label="Add to favorites"
					>
						<Heart className="w-4 h-4 text-gray-600"/>
					</button>
					<button
						className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
						aria-label="Share product"
					>
						<Share2 className="w-4 h-4 text-gray-600"/>
					</button>
				</div>
			</div>
			
			{/* Price */}
			<div className="bg-linear-to-r from-orange-50 to-orange-100 rounded-lg p-3">
				<div className="text-xl font-bold text-orange-600">{formatPrice(product.price)}</div>
			</div>
			
			{/* Specifications Table */}
			<div className="border border-gray-200 rounded-lg overflow-hidden">
				<div className="grid grid-cols-2 divide-y divide-gray-200">
					{/* Dimensions */}
					<div className="px-3 py-1.5 bg-gray-50">
						<span className="text-xs text-gray-600">Kích thước</span>
					</div>
					<div className="px-3 py-1.5">
            <span className="text-xs font-medium text-gray-900">
              {formatDimensions(product.length, product.width, product.height)}
            </span>
					</div>
					
					{/* Origin */}
					<div className="px-3 py-1.5 bg-gray-50">
						<span className="text-xs text-gray-600">Xuất xứ</span>
					</div>
					<div className="px-3 py-1.5">
						<span className="text-xs font-medium text-gray-900">{product.origin_vn}</span>
					</div>
					
					{/* Color */}
					<div className="px-3 py-1.5 bg-gray-50">
						<span className="text-xs text-gray-600">Màu sắc</span>
					</div>
					<div className="px-3 py-1.5">
						<span className="text-xs font-medium text-gray-900">{product.color_vn}</span>
					</div>
					
					{/* Material */}
					<div className="px-3 py-1.5 bg-gray-50">
						<span className="text-xs text-gray-600">Chất liệu</span>
					</div>
					<div className="px-3 py-1.5">
						<span className="text-xs font-medium text-gray-900">{product.material_vn}</span>
					</div>
					
					{/* Status */}
					<div className="px-3 py-1.5 bg-gray-50">
						<span className="text-xs text-gray-600">Tình trạng</span>
					</div>
					<div className="px-3 py-1.5">
						<span className="text-xs font-medium text-green-600">Còn hàng</span>
					</div>
				</div>
			</div>
			
			{/* Description */}
			<div className="border border-gray-200 rounded-lg p-2.5">
				<h3 className="text-sm font-semibold text-gray-900 mb-1.5">Mô tả sản phẩm</h3>
				<p className="text-xs text-gray-600 leading-relaxed line-clamp-5">
					{product.description_vn}
				</p>
			</div>
			
			{/*/!* Warranty *!/*/}
			{/*<div className="bg-green-50 border border-green-200 rounded-lg p-2.5">*/}
			{/*  <h3 className="text-sm font-semibold text-green-800 mb-1">Bảo hành</h3>*/}
			{/*  <p className="text-xs text-green-700">*/}
			{/*    Thời gian bảo hành: <span className="font-medium">{product.warranty_period} tháng</span>*/}
			{/*  </p>*/}
			{/*</div>*/}
			
			{/*/!* Action Buttons *!/*/}
			{/*<div className="flex flex-col sm:flex-row gap-2">*/}
			{/*  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">*/}
			{/*    <ShoppingCart className="w-4 h-4" />*/}
			{/*    <span className="text-sm">Đi đến giỏ hàng</span>*/}
			{/*  </button>*/}
			{/*  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">*/}
			{/*    <ShoppingCart className="w-4 h-4" />*/}
			{/*    <span className="text-sm">Đã thêm vào giỏ (1)</span>*/}
			{/*  </button>*/}
			{/*</div>*/}
		</div>
	);
};

export default ProductInfo;
