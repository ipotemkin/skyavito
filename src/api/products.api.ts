import {
  createApi,
  // fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

// import { API_URL } from '../constants'
// import { RootState } from '../store';
import {
  AdImageToAdArgs, CardType, CreateAd, CreateAdArgs,
  CreateReviewArgs,
  DeleteAdImageArgs,
  // CreateUser, Credentials, RefreshTokensRequest,
  Review,
  // UpdateAd,
  UpdateAdArgs,
  // Tokens,
  UpdateUser, User, UserIdAndPage,
 } from '../types'
import customFetchBase from './customFetchBase';

export const productsApi = createApi({
  reducerPath: 'products/api',
  tagTypes: ['userData', 'adsData', 'commentsData'],
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    // adverisments ==========================================================
    getProducts: build.query<CardType[], void>({
      query: () => 'ads',
      providesTags: ['adsData']
    }),
    getMyAds: build.query<CardType[], void>({
      query: () => 'ads/me',
      providesTags: ['adsData']
    }),
    getAdsByUserId: build.query<CardType[], number>({
      query: (id: number) => `ads?user_id=${id}`,
      providesTags: ['adsData']
    }),
    getAdsByUserIdaAndPage: build.query<CardType[], UserIdAndPage>({
      query: ({id, page}) => `ads?user_id=${id}&page=${page}`,
      providesTags: ['adsData']
    }),
    getProduct: build.query<CardType, number>({
      query: (idx: number) => `ads/${idx}`,
      providesTags: ['adsData']
    }),
    delAd: build.mutation<void, number>({
      query: (idx: number) => ({
        url: `ads/${idx}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['adsData']
    }),

    // comments ==============================================================
    getProductComments: build.query<Review[], number>({
      query: (idx: number) => `ads/${idx}/comments`,
      providesTags: ['commentsData']
    }),
    createReview: build.mutation<Review, CreateReviewArgs>({
      query: ({id, body }) => ({
        url: `ads/${id}/comments`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['commentsData']
    }),

    // user ==================================================================
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
      query: ({ body, params }) => ({
        url: `ads`,
        method: 'POST',
        body,
        params,
      }),
      invalidatesTags: ['adsData'],
    }),
    updateAd: build.mutation<CardType, UpdateAdArgs>({
      query: ({ id, body }) => ({
        url: `ads/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['adsData'],
    }),

    // images ================================================================
    adImageToAd: build.mutation<CardType, AdImageToAdArgs>({
      query: ({idx, body}) => ({
        url: `ads/${idx}/image`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['adsData'],
    }),
    deleteAdImage: build.mutation<CardType, DeleteAdImageArgs>({
      query: ({idx, fileUrl }) => ({
        url: `ads/${idx}/image?file_url=${fileUrl}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['adsData'],
    }),

  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useDelAdMutation,
  useGetProductCommentsQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetMyAdsQuery,
  useUpdateUserAvatarMutation,
  useCreateAdMutation,
  useUpdateAdMutation,
  useCreateAdTextMutation,
  useAdImageToAdMutation,
  useDeleteAdImageMutation,
  useGetAdsByUserIdQuery,
  useGetAdsByUserIdaAndPageQuery,
  useCreateReviewMutation,
} = productsApi
