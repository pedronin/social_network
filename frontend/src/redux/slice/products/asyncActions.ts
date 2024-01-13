import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TypeProductItem } from './types';

import { SERVER_URL } from '../../../env'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({baseUrl: SERVER_URL}),
  endpoints: (build) => ({
    fetchAllProducts: build.query<TypeProductItem[], string>({
      query: (arg) => ({
        url: `/items${arg}`,
      })
    }),
    getOneProduct: build.query<TypeProductItem, string>({
      query: (id) => ({
        url: `/items/${id}`,
      })
    })
  })
})
