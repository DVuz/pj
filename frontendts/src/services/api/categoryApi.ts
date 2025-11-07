import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../query';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    // Tạo mới category (POST, có thể kèm file)
    createCategory: builder.mutation({
      query: formData => ({
        url: '/category/create',
        method: 'POST',
        body: formData, // formData là instance của FormData
      }),
    }),
    // Lấy danh sách category (GET, truyền query params)
    getCategories: builder.query({
      query: params => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        return {
          url: `/category${queryString}`,
          method: 'GET',
        };
      },
    }),

    //get detail category by id
    getDetailCategoryById: builder.query({
      query: (id: number | string) => ({
        url: `/category/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoriesQuery, useGetDetailCategoryByIdQuery } = categoryApi;
