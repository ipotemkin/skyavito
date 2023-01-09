import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

// type ModalNames = 'login' | 'signup' | 'newAd' | 'reviews' | null

type SearchType = {
  value: string
}

const initialState: SearchType = {
  value: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    clearSearchValue: () => {
      return { ...initialState }
    },
  }
})

export const {
  setSearchValue,
  clearSearchValue,
} = searchSlice.actions

export const selectSearchValue = (state: RootState) => state.search.value

export default searchSlice.reducer
