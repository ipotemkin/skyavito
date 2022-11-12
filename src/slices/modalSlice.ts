import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

type ModalNames = 'login' | 'signup' | null

type ModalsType = {
  visible: ModalNames
}

const initialState: ModalsType = {
  visible: null,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalNames>) => {
      state.visible = action.payload
    },
    hideModals: () => {
      return { ...initialState }
    },
  }
})

export const {
  showModal,
  hideModals
} = modalSlice.actions

export const selectModal = (state: RootState) => state.modal.visible

export default modalSlice.reducer
