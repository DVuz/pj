interface CategoryHeaderProps {
	imageUrl: string;
	categoryName: string;
	description: string;
}

export const CategoryHeader = ({ imageUrl, categoryName, description }: CategoryHeaderProps) => {
	return (
		<div className="bg-white rounded-lg shadow-md mb-5 p-5">
			<div className="flex items-center">
				<img
					className="w-20 h-20 object-cover rounded-lg mr-4"
					src={imageUrl}
					alt={categoryName}
				/>
				<div className="flex-1">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">{categoryName}</h1>
					<div
						className="text-sm text-gray-600"
						dangerouslySetInnerHTML={{ __html: description || '' }}
					/>
				</div>
			</div>
		</div>
	);
};
