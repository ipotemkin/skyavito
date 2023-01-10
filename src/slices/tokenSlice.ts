import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authApi } from '../api/auth.api'
import { RootState } from '../store'
import { Tokens } from '../types'

const initialState: Tokens = {}

export const tokenSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
      setTokens: (state, action: PayloadAction<Tokens>) => {
        state = { ...action.payload }
      },
      updateTokens: (state, action: PayloadAction<Tokens>) => {
        return state = {
          ...state,
          ...action.payload
        }
      },
      deleteTokens: () => {
        // Cookies.remove(accessTokenName)
        return { ...initialState }
      }
    },
    extraReducers: builder => {
      // signIn
      builder.addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
        //   if (payload.idToken)
        //     Cookies.set(accessTokenName, payload.idToken)
          
          return state = { ...payload }
        }
      )

      // refreshToken
      builder.addMatcher(
        authApi.endpoints.refreshTokens.matchFulfilled,
        (state, { payload }) => {
        //   if (payload.idToken)
        //     Cookies.set(accessTokenName, payload.idToken)

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
  