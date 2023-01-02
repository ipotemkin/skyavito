import { useEffect, useState } from "react"

import { setSearchValue } from "../slices/searchSlice"
import { useAppDispatch } from "./appHooks"

export const useSearch = () => {
  const dispatch = useAppDispatch()
  const [text, setText] = useState<string>('')

  // debounce
  useEffect(() => {
    const handler = setTimeout(() => dispatch(setSearchValue(text.trim())), 300)

    return () => clearTimeout(handler)
  }, [text])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setText(value)
  }

  return { data: text, handleChange }
}
