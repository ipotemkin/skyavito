import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import { productsApi } from './api/products.api'
import modalReducer from './slices/modalSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: getDefaultMiddleware => (
    getDefaultMiddleware()
    .concat(productsApi.middleware)
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
