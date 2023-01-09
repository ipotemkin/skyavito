import { createContext, useContext } from 'react'

export const SliderContext = createContext({
    selImageId: 0,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setSelImageId: (imgId = 0) => {},
  })

export const useSliderContext = () => useContext(SliderContext)
