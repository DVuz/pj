import { baseQueryWithReauth } from '@/services/query.ts';
import { createApi } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  endpoints: builder => ({
    createProduct: builder.mutation({
      query: formData => ({
        url: '/products',
        method: 'POST',
        body: formData,
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `/products/${productId}`,
        method: 'PUT',
        body: formData,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: 'DELETE',
      }),
    }),

    getProducts: builder.query({
      query: params => {

        const cleanedParams: Record<string, string> = {};

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
    }),

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
  useDeleteProductMutation,
} = productApi;
