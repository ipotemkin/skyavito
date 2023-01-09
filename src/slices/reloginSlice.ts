import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../api/auth.api'

import { RootState } from '../store'

type ReloginType = {
  value: boolean
}

const initialState: ReloginType = {
  value: false,
}

export const needReloginSlice = createSlice({
  name: 'needRelogin',
  initialState,
  reducers: {
    setNeedRelogin: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      () => ({ value: false })
    ),
    builder.addMatcher(
      authApi.endpoints.refreshTokens.matchFulfilled,
      () => ({ value: false })
    )
  }
})

export const {
  setNeedRelogin,
} = needReloginSlice.actions

export const selectNeedRelogin = (state: RootState) => state.needRelogin.value

export default needReloginSlice.reducer
