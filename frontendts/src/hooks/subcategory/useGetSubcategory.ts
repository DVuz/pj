import { useState, useCallback, useEffect } from "react";
import type { Pagination } from "../../types/common.types";
import type { SubcategoryQuery } from "@/types/subcategory.type";
import { useGetSubcategoriesQuery } from "@/services/api/subcategoryApi.ts";

// Giá trị mặc định ban đầu
const INITIAL_QUERY: SubcategoryQuery = {
	status: "all",
	subcategory_name_vn: "",
	category_id: "",
	page: 1,
	limit: 10,
	sort_by: "created_at",
	sort_order: "ASC",
};

export const useGetSubcategory = () => {
	const [query, setQuery] = useState<SubcategoryQuery>(INITIAL_QUERY);

	const [pagination, setPagination] = useState<Pagination>({
		page: 1,
		limit: 10,
		total: 0,
		totalPages: 0,
	});

	// Lọc bỏ giá trị rỗng trước khi gửi lên API
	const filteredQuery = Object.fromEntries(
		Object.entries(query).filter(([key, value]) => {
			if (key === "status" && value === "all") return false;
			return value !== null && value !== undefined && value !== "";
		})
	) as Partial<SubcategoryQuery>;

	const { data, isLoading, error } = useGetSubcategoriesQuery(filteredQuery);

	useEffect(() => {
		console.log("Subcategory API response:", data);
		console.log("Current query:", query);
		console.log("Filtered query sent to API:", filteredQuery);

		if (data?.data?.pagination) {
			setPagination(data.data.pagination);
		}

		if (error) {
			console.error("Error fetching subcategories:", error);
		}
	}, [data, error]);

	// === Các handler thay đổi query ===

	const handlePageChange = useCallback((newPage: number) => {
		setQuery((prev) => ({
			...prev,
			page: newPage,
		}));
	}, []);

	const handleLimitChange = useCallback((newLimit: number) => {
		setQuery((prev) => ({
			...prev,
			limit: newLimit,
		}));
	}, []);

	const handleStatusChange = useCallback(
		(status: "active" | "inactive" | "all") => {
			setQuery((prev) => ({
				...prev,
				status,
				page: 1,
			}));
		},
		[]
	);

	const handleSortChange = useCallback((sortValue: string) => {
		const [sort_by, sort_order] = sortValue.split("|") as [
				"subcategory_name_vn" | "created_at",
				"ASC" | "DESC"
		];
		setQuery((prev) => ({
			...prev,
			sort_by,
			sort_order,
			page: 1,
		}));
	}, []);

	const handleSearchChange = useCallback((searchValue: string) => {
		setQuery((prev) => ({
			...prev,
			subcategory_name_vn: searchValue,
			page: 1,
		}));
	}, []);

	const handleCategoryChange = useCallback((categoryId: string | number) => {
		setQuery((prev) => ({
			...prev,
			category_id: String(categoryId),
			page: 1,
		}));
	}, []);

	// ✅ Làm mới query (reset toàn bộ bộ lọc)
	const handleRefreshQuery = useCallback(() => {
		setQuery(INITIAL_QUERY);
		setPagination({
			page: 1,
			limit: 10,
			total: 0,
			totalPages: 0,
		});
	}, []);

	return {
		query,
		pagination,
		data: data ? data.data?.subcategories || [] : [],
		isLoading,
		error,
		handlePageChange,
		handleLimitChange,
		handleStatusChange,
		handleSortChange,
		handleSearchChange,
		handleCategoryChange,
		handleRefreshQuery,
	};
};
