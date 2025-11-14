import { baseQueryWithReauth } from '@/services/query.ts';
import { createApi } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithReauth,
  // Tắt auto-retry để tránh fetch liên tục khi lỗi
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  endpoints: builder => ({
    // Tạo mới product (POST, có thể kèm file)
    createProduct: builder.mutation({
      query: formData => ({
        url: '/products',
        method: 'POST',
        body: formData,
      }),
    }),
    // Cập nhật product (PUT/PATCH, có thể kèm file)
    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `/products/${productId}`,
        method: 'PUT',
        body: formData,
      }),
    }),
    // Lấy danh sách product (GET, truyền query params)
    getProducts: builder.query({
      query: params => {
        // Loại bỏ các giá trị không hợp lệ trước khi tạo query string
        const cleanedParams: Record<string, string> = {};

        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            // Chỉ thêm vào nếu giá trị hợp lệ
            if (value !== null && value !== undefined && value !== '' && !Number.isNaN(value)) {
              cleanedParams[key] = String(value);
            }
          });
        }

        const queryString =
          Object.keys(cleanedParams).length > 0
            ? '?' + new URLSearchParams(cleanedParams).toString()
            : '';

        console.log('Fetching products with params:', params);
        console.log('Cleaned params:', cleanedParams);
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
    //get detail product by id
    getProductById: builder.query({
      query: id => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
    }),
  }),
});
export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
} = productApi;
