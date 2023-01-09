import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from '../constants'
import { CreateUser, Credentials, RefreshTokensRequest, Tokens, User } from '../types';


export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (build) => ({
    login: build.mutation<Tokens, Credentials>({
      query: (body: Credentials) => ({
        url: `auth/login`,
        method: 'POST',
        body,
      })
    }),
    signUp: build.mutation<User, CreateUser>({
      query: (body: CreateUser) => ({
        url: `auth/register`,
        method: 'POST',
        body,
      })
    }),
    refreshTokens: build.mutation<Tokens, RefreshTokensRequest>({
      query: (body: RefreshTokensRequest) => ({
        url: `auth/login`,
        method: 'PUT',
        body,
      })
    }),

  }),
})

export const {
  useLoginMutation,
  useSignUpMutation,
  useRefreshTokensMutation,
  } = authApi
