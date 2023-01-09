/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext, useContext } from 'react'

export const InputFileBarContext = createContext({
  setImageUrl: (imgUrl = '', imgId = 0, file: File | null) => {},
  delImageUrl: (imgUrl: number) => {},
})

export const useInputFileBarContext = () => useContext(InputFileBarContext)
