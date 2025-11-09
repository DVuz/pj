import { Toaster, toast } from "react-hot-toast";
import ImageUpload from '@/components/admin/ImageUpload';
import Button from '@/components/ui/custome/Button';
import Input from '@/components/ui/custome/Input';
import Select from '@/components/ui/custome/Select';
import Loading from '@/components/ui/Loading';
import { SET_ACTIVE_OPTIONS } from '@/constants/common';
import type { Subcategory } from "@/types/subcategory.type.ts";
import { useGetSubcategoriesQuery } from "@/services/api/subcategoryApi.ts";
import TipTapEditor from "@/components/ui/TipTapEditor.tsx";

const CreatePTPage = () => {
	const { data, error, isLoading: loadingSubcategories } = useGetSubcategoriesQuery({});
	const subcategoriesData = data?.data?.subcategories;
	
	const subcategoryOptions =
		subcategoriesData?.map((subcategory: Subcategory) => ({
			value: subcategory.subcategory_id.toString(),
			label: subcategory.subcategory_name_vn,
		})) || [];
	
	if (loadingSubcategories) {
		return <Loading type="div" text="Đang tải loại sản phẩm..." />;
	}
	
	if (error) {
		return (
			<div className="bg-white p-4 rounded-md border shadow-md max-w-7xl mx-auto">
				<div className="flex flex-col items-center justify-center p-6 min-h-[400px]">
					<div className="text-red-500 text-6xl mb-4">⚠️</div>
					<h2 className="text-xl font-semibold text-red-600 mb-2">Có lỗi xảy ra</h2>
					<p className="text-gray-600 text-center mb-4">
						Không thể tải loại sản phẩm. Vui lòng thử lại sau.
					</p>
					<button
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
					>
						Thử lại
					</button>
				</div>
			</div>
		);
	}
	
	return (
		<>
			<Toaster />
			<div className="p-2 max-w-4xl mx-auto">
				<h1 className="text-2xl font-bold mb-6">Tạo loại sản phẩm mới</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						toast.success('Chức năng đang được phát triển!');
					}}
				>
					<Select
						label="Danh mục con"
						name="subcategoryId"
						value=""
						onChange={() => {}}
						options={subcategoryOptions}
						required
					/>
					<Input
						label="Tên loại sản phẩm"
						type="text"
						name="productTypeNameVn"
						placeholder="Nhập tên loại sản phẩm..."
						value=""
						onChange={() => {}}
						required
					/>
					<TipTapEditor
						label="Mô tả loại sản phẩm"
						value=""
						placeholder="Nhập mô tả loại sản phẩm..."
						height="200px"
						onChange={() => {}}
					/>
					<Select
						label="Trạng thái"
						name="status"
						value=""
						onChange={() => {}}
						options={SET_ACTIVE_OPTIONS}
						required
					/>
					<ImageUpload
						label="Hình ảnh loại sản phẩm"
						name="productTypeImage"
						onChange={() => {}}
						required
					/>
					<div className="mt-6 flex gap-4 justify-end">
						<Button
							type="button"
							variant="secondary"
							size="large"

						>
							Làm mới
						</Button>
						<Button variant="primary" size="large" type="submit" >
							Tạo loại sản phẩm
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};

export default CreatePTPage;
