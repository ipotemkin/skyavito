import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from '../constants'
import { CardType, Credentials, Review, Tokens, User } from '../types'

export const productsApi = createApi({
  reducerPath: 'products/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (build) => ({
    getProducts: build.query<CardType[], void>({
      // query: () => 'products',
      query: () => 'ads',
    }),
    getProduct: build.query<CardType, number>({
      query: (idx: number) => `ads/${idx}`,
      // query: (idx: number) => `products/${idx}`,
     
      // transformResponse: (response: CourseData) => {
      //   if (!response) throw Error('Нет такого курса')
      //   if (response.description)
      //     response.description = parseFirebaseString(response.description)
      //   return response
      // },
    }),
    getProductComments: build.query<Review[], number>({
      query: (idx: number) => `ads/${idx}/comments`,
    }),
    login: build.mutation<Tokens, Credentials>({
      query: (args: Credentials) => {
        // console.log('api:credentials -->', args)
        return {
          url: `auth/login`,
          method: 'POST',
          body: { ...args },
          // mode: 'no-cors',
        }
      }
    }),

  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductCommentsQuery,
  useLoginMutation,
} = productsApi
