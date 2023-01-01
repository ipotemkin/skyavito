import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Tokens } from '../types'
import { productsApi } from '../api/products.api'
import { RootState } from '../store'

const initialState: Tokens = {
}

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
      deleteTokens: (state) => {
        // Cookies.remove(accessTokenName)
        return state = { ...initialState }
      }
    },
    extraReducers: builder => {
      // signUp
    //   builder.addMatcher(
    //     authApi.endpoints.signUp.matchFulfilled,
    //     (state, { payload }) => {
    //       if (payload.idToken)
    //         Cookies.set(accessTokenName, payload.idToken)
          
    //       return state = {
    //         ...payload,
    //         needRelogin: false
    //       }
    //     }
    //   )
      // signIn
      builder.addMatcher(
        productsApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
        //   if (payload.idToken)
        //     Cookies.set(accessTokenName, payload.idToken)
          
          return state = {...payload}
        }
      )
    //   // changeEmail
    //   builder.addMatcher(
    //     authApi.endpoints.changeEmail.matchFulfilled,
    //     (state, { payload }) => {
    //       if (payload.idToken)
    //         Cookies.set(accessTokenName, payload.idToken)
  
    //       return state = {
    //         ...state,
    //         ...payload
    //       }
    //     }
    //   )
    //   // changePassword
    //   builder.addMatcher(
    //     authApi.endpoints.changePassword.matchFulfilled,
    //     (state, { payload }) => {
    //       if (payload.idToken)
    //         Cookies.set(accessTokenName, payload.idToken)
  
    //       return state = {
    //         ...state,
    //         ...payload
    //       }
    //     }
    //   )
    //   // refreshToken
    //   builder.addMatcher(
    //     authApi.endpoints.refreshToken.matchFulfilled,
    //     (state, { payload }) => {
    //       if (payload.id_token)
    //         Cookies.set(accessTokenName, payload.id_token)
  
    //       return state = {
    //         ...state,
    //         idToken: payload.id_token, 
    //         refreshToken: payload.refresh_token,
    //         needRelogin: false
    //       }
    //     }
    //   )
    //   // getUserData
    //   builder.addMatcher(
    //     authApi.endpoints.getUserData.matchFulfilled,
    //     (state, { payload }) => {
    //       if (payload.idToken)
    //         Cookies.set(accessTokenName, payload.idToken)
  
    //       return state = {
    //         ...state,
    //         ...payload
    //       }
    //     }
    //   )
      
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
  