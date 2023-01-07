import { createApi } from '@reduxjs/toolkit/query/react'
import { SORTING } from '../constants';

import {
  AddImageToAdArgs, CardType, CreateAd, CreateAdArgs, UpdateAdArgs,
  CreateReviewArgs, Review,
  DeleteAdImageArgs,
  UpdateUser, User
 } from '../types'
import customFetchBase from './customFetchBase';

export const productsApi = createApi({
  reducerPath: 'products/api',
  tagTypes: ['userData', 'adsData', 'commentsData'],
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    // adverisments ==========================================================
    createAd: build.mutation<CardType, CreateAdArgs>({
      query: ({ body, params }) => ({
        url: `ads`,
        method: 'POST',
        body,
        params,
      }),
      invalidatesTags: ['adsData'],
    }),
    createAdText: build.mutation<CardType, CreateAd>({
      query: (newAd: CreateAd) => ({
        url: `adstext`,
        method: 'POST',
        body: newAd
      }),
      invalidatesTags: ['adsData'],
    }),
    delAd: build.mutation<void, number>({
      query: (idx: number) => ({
        url: `ads/${idx}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['adsData']
    }),
    getAd: build.query<CardType, number>({
      query: (idx: number) => `ads/${idx}`,
      providesTags: ['adsData']
    }),
    getAds: build.query<CardType[], void>({
      query: () => `ads?${SORTING}`,
      providesTags: ['adsData']
    }),
    getAdsByUserId: build.query<CardType[], number>({
      query: (id: number) => `ads?user_id=${id}&${SORTING}`,
      providesTags: ['adsData']
    }),
    getMyAds: build.query<CardType[], number>({
      query: () => `ads/me?${SORTING}`,
      providesTags: ['adsData']
    }),
    updateAd: build.mutation<CardType, UpdateAdArgs>({
      query: ({ id, body }) => ({
        url: `ads/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['adsData'],
    }),

    // comments/reviews ======================================================
    createReview: build.mutation<Review, CreateReviewArgs>({
      query: ({id, body }) => ({
        url: `ads/${id}/comments`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['commentsData']
    }),
    getAdReviews: build.query<Review[], number>({
      query: (idx: number) => `ads/${idx}/comments`,
      providesTags: ['commentsData']
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
      invalidatesTags: ['userData', 'adsData'],
    }),
    updateUserAvatar: build.mutation<User, FormData>({
      query: (arg: FormData) => ({
        url: `user/avatar`,
        method: 'POST',
        body: arg
      }),
      invalidatesTags: ['userData', 'adsData'],
    }),
    
    // images ================================================================
    addImageToAd: build.mutation<CardType, AddImageToAdArgs>({
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
  useCreateAdMutation, useCreateAdTextMutation, useDelAdMutation,
  useGetAdQuery, useGetAdsQuery, useGetAdsByUserIdQuery, useGetMyAdsQuery,
  useUpdateAdMutation,
  useCreateReviewMutation, useGetAdReviewsQuery,
  useGetUserQuery, useUpdateUserMutation, useUpdateUserAvatarMutation,
  useAddImageToAdMutation, useDeleteAdImageMutation,
} = productsApi
