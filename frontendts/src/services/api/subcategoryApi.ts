import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../query';

export const subcategoryApi = createApi({
  reducerPath: 'subcategoryApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    // Tạo mới subcategory (POST, có thể kèm file)
    createSubcategory: builder.mutation({
      query: formData => ({
        url: '/subcategory/create',
        method: 'POST',
        body: formData,
      }),
    }),
    // Lấy danh sách subcategory (GET, truyền query params)
    getSubcategories: builder.query({
      query: params => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        console.log('Fetching subcategories with params:', params);
        console.log('Final URL:', `/subcategory${queryString}`);
        return {
          url: `/subcategory${queryString}`,
          method: 'GET',
        };
      },
      transformResponse: response => {
        console.log('Raw subcategory API response:', response);
        return response;
      },
    }),
  }),
});

export const { useCreateSubcategoryMutation, useGetSubcategoriesQuery } = subcategoryApi;
