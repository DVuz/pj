import { ChevronDown } from 'lucide-react';
import { ProductTypeItem } from './ProductTypeItem';
import type { ProductType } from '../types/categoryDetail.ts';

interface Subcategory {
	subcategory_id: number;
	subcategory_name_vn: string;
	image_url: string;
	product_type_count: number;
	total_product_count: number;
	product_types: ProductType[];
}

interface SubcategoryItemProps {
	subcategory: Subcategory;
	index: number;
	isExpanded: boolean;
	onToggleSubcategory: () => void;
	expandedProductTypes: Set<number>;
	onToggleProductType: (id: number) => void;
}

export const SubcategoryItem = ({
	                                subcategory,
	                                index,
	                                isExpanded,
	                                onToggleSubcategory,
	                                expandedProductTypes,
	                                onToggleProductType,
                                }: SubcategoryItemProps) => {
	return (
		<div className="border rounded-lg mb-3 overflow-hidden">
			<div
				className="bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition-colors"
				onClick={onToggleSubcategory}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center flex-1">
            <span className="w-7 h-7 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
              {index + 1}
            </span>
						<img
							className="w-14 h-14 object-cover rounded-lg mr-4"
							src={subcategory.image_url}
							alt={subcategory.subcategory_name_vn}
						/>
						<div className="flex-1">
							<h3 className="text-lg font-semibold text-gray-800">
								{subcategory.subcategory_name_vn}
							</h3>
							<div className="flex gap-3 mt-1">
                <span className="text-sm bg-white px-2 py-1 rounded-full text-gray-700 border">
                  {subcategory.product_type_count} loại
                </span>
								<span className="text-sm bg-white px-2 py-1 rounded-full text-gray-700 border">
                  {subcategory.total_product_count} sản phẩm
                </span>
							</div>
						</div>
					</div>
					<ChevronDown
						className={`w-6 h-6 text-gray-600 transition-transform ${
							isExpanded ? 'rotate-180' : ''
						}`}
					/>
				</div>
			</div>
			
			{isExpanded && (
				<div className="p-4 bg-white">
					{subcategory.product_types.map((productType) => (  // Direct access
						<ProductTypeItem
							key={productType.product_type_id}
							productType={productType}
							isExpanded={expandedProductTypes.has(productType.product_type_id)}
							onToggle={() => onToggleProductType(productType.product_type_id)}
						/>
					))}
				</div>
			)}
		</div>
	);
};
