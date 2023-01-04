import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import { authApi } from './api/auth.api'
import { productsApi } from './api/products.api'
import modalReducer from './slices/modalSlice'
import searchReducer from './slices/searchSlice'
import tokenReducer from './slices/tokenSlice'
import needReloginReducer from './slices/reloginSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    search: searchReducer,
    token: tokenReducer,
    needRelogin: needReloginReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware => (
    getDefaultMiddleware()
    .concat(productsApi.middleware)
    .concat(authApi.middleware)
  )
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
