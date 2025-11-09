import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "@/services/query.ts";

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({
		// Tạo mới product (POST, có thể kèm file)
		createProduct: builder.mutation({
			query: formData => ({
				url: '/products',
				method: 'POST',
				body: formData,
			}),
		}),
		// Lấy danh sách product (GET, truyền query params)
		getProducts: builder.query({
			query: params => {
				const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
				console.log('Fetching products with params:', params);
				console.log('Final URL:', `/products${queryString}`);
				return {
					url: `/products${queryString}`,
					method: 'GET',
				};
			},
			transformResponse: response => {
				console.log('Raw product API response:', response);
				return response;
			},
		}),
	}),
})
export const {useCreateProductMutation, useGetProductsQuery} = productApi;