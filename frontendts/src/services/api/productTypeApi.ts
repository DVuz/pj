import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../query';

export const productTypeApi = createApi({
  reducerPath: 'productTypeApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['ProductTypes'],
  endpoints: builder => ({
    //create product type (POST, included file)
    createProductType: builder.mutation({
      query: formData => ({
        url: '/productTypes/create',
        method: 'POST',
        body: formData, // formData là instance của FormData
      }),
      invalidatesTags: [{ type: 'ProductTypes', id: 'LIST' }],
    }),
    //get product types (GET) included query params
    getProductTypes: builder.query({
      query: params => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        return {
          url: `/productTypes${queryString}`,
          method: 'GET',
        };
      },
      providesTags: () => [{ type: 'ProductTypes', id: 'LIST' }],
    }),
    //get product type by id (GET)
    getProductTypeById: builder.query({
      query: id => ({
        url: `/productTypes/${id}`,
        method: 'GET',
      }),
    }),
    //delete product type by id (DELETE)
    deleteProductTypeById: builder.mutation({
      query: (productTypeId: number) => ({
        url: `/productTypes/${productTypeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'ProductTypes', id: 'LIST' }],
    }),
    //update product type by id (PUT, included file)
    updateProductTypeById: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/productTypes/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),
  }),
});

export const {
  useCreateProductTypeMutation,
  useGetProductTypesQuery,
  useDeleteProductTypeByIdMutation,
  useUpdateProductTypeByIdMutation,
  useGetProductTypeByIdQuery,
} = productTypeApi;
