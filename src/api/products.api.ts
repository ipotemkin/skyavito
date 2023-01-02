import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from '../constants'
import { RootState } from '../store';
import { AdImageToAdArgs, CardType, CreateAd, CreateAdArgs, Credentials, Review, Tokens, UpdateUser, User } from '../types'

export const productsApi = createApi({
  reducerPath: 'products/api',
  tagTypes: ['userData', 'adsData'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.access_token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getProducts: build.query<CardType[], void>({
      // query: () => 'products',
      query: () => 'ads',
      providesTags: ['adsData']
    }),
    getMyAds: build.query<CardType[], void>({
      query: () => 'ads/me',
      providesTags: ['adsData']
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
    getUser: build.query<User, number>({
      query: () => `user`,
      providesTags: ['userData'],
    }),
    updateUser: build.mutation<User, UpdateUser>({
      query: (arg: UpdateUser) => ({
        url: `user`,
        method: 'PATCH',
        body: arg,
      }),
      invalidatesTags: ['userData'],
    }),
    updateUserAvatar: build.mutation<User, FormData>({
      query: (arg: FormData) => ({
        url: `user/avatar`,
        method: 'POST',
        body: arg
      }),
      invalidatesTags: ['userData'],
    }),
    createAdText: build.mutation<CardType, CreateAd>({
      query: (newAd: CreateAd) => ({
        url: `adstext`,
        method: 'POST',
        body: newAd
      }),
      invalidatesTags: ['adsData'],
    }),
    createAd: build.mutation<CardType, CreateAdArgs>({
      query: (args: CreateAdArgs) => ({
        url: `ads`,
        method: 'POST',
        body: args.body,
        params: args.params,
      }),
      invalidatesTags: ['adsData'],
    }),
    adImageToAd: build.mutation<CardType, AdImageToAdArgs>({
      query: ({idx, body}) => ({
        url: `ads/${idx}/image`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['adsData'],
    }),

  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductCommentsQuery,
  useLoginMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetMyAdsQuery,
  useUpdateUserAvatarMutation,
  useCreateAdMutation,
  useCreateAdTextMutation,
  useAdImageToAdMutation,
} = productsApi
