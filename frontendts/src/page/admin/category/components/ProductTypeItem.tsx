import { ChevronDown } from 'lucide-react';
import { ProductCard } from './ProductCard';

interface ProductType {
	product_type_id: number;
	product_type_name_vn: string;
	image_url: string;
	product_count: number;
	active_product_count: number;
	products: any[];
}

interface ProductTypeItemProps {
	productType: ProductType;
	isExpanded: boolean;
	onToggle: () => void;
}

export const ProductTypeItem = ({ productType, isExpanded, onToggle }: ProductTypeItemProps) => {
	return (
		<div className="mb-4 last:mb-0">
			<div
				className={`flex items-center p-3 border-b ${
					productType.product_count > 0
						? 'cursor-pointer hover:bg-gray-50'
						: 'bg-gray-50'
				}`}
				onClick={() => productType.product_count > 0 && onToggle()}
			>
				<img
					className="w-12 h-12 object-cover rounded-lg mr-3"
					src={productType.image_url}
					alt={productType.product_type_name_vn}
				/>
				<div className="flex-1">
					<h4 className="text-base font-semibold text-gray-800">
						{productType.product_type_name_vn}
					</h4>
					<p className="text-sm text-gray-500 mt-1">
						<span className="font-medium">{productType.product_count}</span> sản phẩm
						{productType.active_product_count > 0 && (
							<span className="ml-2 text-green-600">
                • {productType.active_product_count} đang hoạt động
              </span>
						)}
					</p>
				</div>
				{productType.product_count > 0 && (
					<ChevronDown
						className={`w-5 h-5 text-gray-600 transition-transform ${
							isExpanded ? 'rotate-180' : ''
						}`}
					/>
				)}
			</div>
			
			{isExpanded && productType.products.length > 0 && (
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-3 pl-4">
					{productType.products.map((product) => (
						<ProductCard key={product.product_id} product={product} />
					))}
				</div>
			)}
		</div>
	);
};
