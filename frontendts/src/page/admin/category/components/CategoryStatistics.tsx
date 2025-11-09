import { List, Tag, Package } from 'lucide-react';
import type { Statistics } from '../types/categoryDetail.ts';

interface CategoryStatisticsProps {
	statistics: Statistics;
}

export const CategoryStatistics = ({ statistics }: CategoryStatisticsProps) => {
	return (
		<div className="grid grid-cols-3 gap-4 mb-5">
			<div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm text-gray-600 mb-1">Danh mục con</p>
						<p className="text-3xl font-bold text-blue-600">
							{statistics.total_subcategories}
						</p>
					</div>
					<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
						<List className="w-6 h-6 text-blue-600" />
					</div>
				</div>
			</div>
			
			<div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm text-gray-600 mb-1">Loại sản phẩm</p>
						<p className="text-3xl font-bold text-green-600">
							{statistics.total_product_types}
						</p>
					</div>
					<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
						<Tag className="w-6 h-6 text-green-600" />
					</div>
				</div>
			</div>
			
			<div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm text-gray-600 mb-1">Sản phẩm</p>
						<p className="text-3xl font-bold text-purple-600">
							{statistics.total_products}
						</p>
					</div>
					<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
						<Package className="w-6 h-6 text-purple-600" />
					</div>
				</div>
			</div>
		</div>
	);
};
