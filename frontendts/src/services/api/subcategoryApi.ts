import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../query';

export const subcategoryApi = createApi({
  reducerPath: 'subcategoryApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Subcategories'],
  endpoints: builder => ({
    createSubcategory: builder.mutation({
      query: formData => ({
        url: '/subcategories/create',
        method: 'POST',
        body: formData,
      }),
    }),

    getSubcategories: builder.query({
      query: params => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        console.log('Fetching subcategories with params:', params);
        console.log('Final URL:', `/subcategory${queryString}`);
        return {
          url: `/subcategories${queryString}`,
          method: 'GET',
        };
      },
      providesTags: () => [{ type: 'Subcategories', id: 'LIST' }],
    }),
    getSubcategoryById: builder.query({
      query: id => ({
        url: `/subcategories/${id}`,
        method: 'GET',
      }),
    }),
    deleteSubcategoryById: builder.mutation({
      query: id => ({
        url: `/subcategories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Subcategories', id: 'LIST' }],
    }),
    updateSubcategoryById: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/subcategories/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),
  }),
});

export const {
  useCreateSubcategoryMutation,
  useGetSubcategoriesQuery,
  useGetSubcategoryByIdQuery,
  useDeleteSubcategoryByIdMutation,
  useUpdateSubcategoryByIdMutation,
} = subcategoryApi;
