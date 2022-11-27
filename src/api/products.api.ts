import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from '../constants'
import { CardType } from '../types'

export const productsApi = createApi({
  reducerPath: 'products/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (build) => ({
    getProducts: build.query<CardType[], void>({
      query: () => 'products',
    }),
    // getCourse: build.query<CourseData, number>({
    //   query: (courseId: number) => `courses/${courseId}.json`,
    //   transformResponse: (response: CourseData) => {
    //     if (!response) throw Error('Нет такого курса')
    //     if (response.description)
    //       response.description = parseFirebaseString(response.description)
    //     return response
    //   },
    // }),
  }),
})

export const {
  useGetProductsQuery,
} = productsApi
