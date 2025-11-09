import { useParams } from '@tanstack/react-router';
import { useGetDetailCategoryByIdQuery } from '@/services/api/categoryApi.ts';
import Loading from '../../../components/ui/Loading';
import type { CategoryDetailData } from './types/categoryDetail';
import { useState } from 'react';
import { CategoryHeader } from './components/CategoryHeader';
import { CategoryStatistics } from './components/CategoryStatistics';
import { SubcategoryItem } from './components/SubcategoryItem';

const CategoryDetail = () => {
	const { id } = useParams({ from: '/admin/categories/detail/$id/$slug' });
	const [expandedSubcategories, setExpandedSubcategories] = useState<Set<number>>(new Set());
	const [expandedProductTypes, setExpandedProductTypes] = useState<Set<number>>(new Set());
	
	const { data, error, isLoading } = useGetDetailCategoryByIdQuery(Number(id));
	const categoryData: CategoryDetailData | undefined = data?.data;
	
	if (isLoading) return <Loading />;
	if (error) return <div>Error loading category details.</div>;
	if(!categoryData) return <div>No category data found.</div>;
	
	const toggleSubcategory = (subcategoryId: number) => {
		setExpandedSubcategories((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(subcategoryId)) {
				newSet.delete(subcategoryId);
			} else {
				newSet.add(subcategoryId);
			}
			return newSet;
		});
	};
	
	const toggleProductType = (productTypeId: number) => {
		setExpandedProductTypes((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(productTypeId)) {
				newSet.delete(productTypeId);
			} else {
				newSet.add(productTypeId);
			}
			return newSet;
		});
	};
	
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto p-4">
				<CategoryHeader
					imageUrl={categoryData?.image_url || ''}
					categoryName={categoryData?.category_name_vn || ''}
					description={categoryData?.description_vn || ''}
				/>
				
				<CategoryStatistics statistics={categoryData?.statistics} />
				
				<div className="bg-white rounded-lg shadow-md mb-4 p-4">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-2xl font-bold text-gray-800">Danh sách danh mục con</h2>
						<span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              {categoryData?.subcategories.length}
            </span>
					</div>
					
					{categoryData?.subcategories.map((subcategory, index) => (
						<SubcategoryItem
							key={subcategory.subcategory_id}
							subcategory={subcategory}
							index={index}
							isExpanded={expandedSubcategories.has(subcategory.subcategory_id)}
							onToggleSubcategory={() => toggleSubcategory(subcategory.subcategory_id)}
							expandedProductTypes={expandedProductTypes}
							onToggleProductType={toggleProductType}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default CategoryDetail;
