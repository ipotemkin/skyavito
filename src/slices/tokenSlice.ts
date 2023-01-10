import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import { authApi } from '../api/auth.api'
import { RootState } from '../store'
import { Tokens } from '../types'

const initialState: Tokens = {}

export const tokenSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
      setTokens: (state, action: PayloadAction<Tokens>) => {
        console.log('setTokens ->', action.payload)
        // state = { ...action.payload }
        return { ...action.payload }
      },
      updateTokens: (state, action: PayloadAction<Tokens>) => {
        return state = {
          ...state,
          ...action.payload
        }
      },
      deleteTokens: () => {
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        return { ...initialState }
      }
    },
    extraReducers: builder => {
      // signIn
      builder.addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          if (payload.access_token)
            Cookies.set('access_token', payload.access_token)

          if (payload.refresh_token)
            Cookies.set('refresh_token', payload.refresh_token)
          
          return state = { ...payload }
        }
      )

      // refreshToken
      builder.addMatcher(
        authApi.endpoints.refreshTokens.matchFulfilled,
        (state, { payload }) => {
          if (payload.access_token)
            Cookies.set('access_token', payload.access_token)

          if (payload.refresh_token)
            Cookies.set('refresh_token', payload.refresh_token)

          console.log('tokens have been updated')
          
          return state = { ...payload }
        }
      )

    }
  })
  
  export const {
    setTokens,
    updateTokens,
    deleteTokens
  } = tokenSlice.actions
  
  export const selectTokens = (state: RootState) => {
    return state.token
  }

  export const selectAccessToken = (state: RootState) => {
    return state.token.access_token
  }

  export default tokenSlice.reducer
  