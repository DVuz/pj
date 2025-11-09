import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../query';

export const productTypeApi = createApi({
  reducerPath: 'productTypeApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    // Tạo mới product type (POST, có thể kèm file)
    createProductType: builder.mutation({
      query: formData => ({
        url: '/productTypes/create',
        method: 'POST',
        body: formData, // formData là instance của FormData
      }),
    }),
    // Lấy danh sách product type (GET, truyền query params)
    getProductTypes: builder.query({
      query: params => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        return {
          url: `/productTypes${queryString}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useCreateProductTypeMutation, useGetProductTypesQuery } = productTypeApi;
