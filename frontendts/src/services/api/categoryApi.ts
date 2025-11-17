import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../query';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Categories'],
  endpoints: builder => ({
    // create category (POST, maybe with form data)
    createCategory: builder.mutation({
      query: formData => ({
        url: '/categories/create',
        method: 'POST',
        body: formData, // formData là instance của FormData
      }),
    }),
    // get all categories with params
    getCategories: builder.query({
      query: params => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        return {
          url: `/categories${queryString}`,
          method: 'GET',
        };
      },
      providesTags: () =>[{ type: 'Categories', id: 'LIST' }]
    }),

    //get detail category by id
    getDetailCategoryById: builder.query({
      query: (id: number | string) => ({
        url: `/categories/${id}`,
        method: 'GET',
      }),
    }),

    //update category by id
    updateCategoryById: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),

    //delete category by id
    deleteCategoryById: builder.mutation({
      query: (id: number | string) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetDetailCategoryByIdQuery,
  useUpdateCategoryByIdMutation,
  useDeleteCategoryByIdMutation,
} = categoryApi;
