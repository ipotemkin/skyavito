import { createContext, useContext } from 'react'

export const InputFileBarContext = createContext({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setImageUrl: (imgUrl = '', imgId = 0, file: File | null) => {},
  })

export const useInputFileBarContext = () => useContext(InputFileBarContext)
