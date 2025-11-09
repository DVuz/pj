import { Eye, EyeOff } from 'lucide-react';

interface Product {
	product_id: number;
	product_code: string;
	product_name_vn: string;
	main_image: string;
	status: string;
	price: number;
}

interface ProductCardProps {
	product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
	return (
		<div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-indigo-300 hover:shadow-lg transition-all">
			<div className="relative">
				<img
					className="w-full h-36 object-cover group-hover:scale-105 transition-transform"
					src={product.main_image}
					alt={product.product_name_vn}
				/>
				<div className="absolute top-2 right-2">
					{product.status === 'visible' ? (
						<span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Hiển thị
            </span>
					) : (
						<span className="px-2 py-1 bg-gray-500 text-white text-xs rounded-full flex items-center gap-1">
              <EyeOff className="w-3 h-3" />
              Ẩn
            </span>
					)}
				</div>
			</div>
			<div className="p-3">
				<p
					className="text-sm font-semibold text-gray-800 truncate"
					title={product.product_name_vn}
				>
					{product.product_name_vn}
				</p>
				<p className="text-xs text-gray-500 mt-1">{product.product_code}</p>
				<p className="text-sm font-bold text-indigo-600 mt-1">
					{product.price.toLocaleString('vi-VN')}đ
				</p>
			</div>
		</div>
	);
};
