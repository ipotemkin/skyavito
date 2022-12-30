import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/appHooks'
// import useDebounce, { useDebounceLazy } from '../../hooks/useDebounce'

import TrianglesIcon from '../../icons/Triangles/TrianglesIcon'
import { setSearchValue } from '../../slices/searchSlice'
import { Button } from '../Button/Button'

import styles from './style.module.css'

export const Search = () => {
  // const searchValue = useAppSelector(selectSearchValue)
  const dispatch = useAppDispatch()
  const [searchStr, setSearchStr] = useState<string>('')
  // const debounce = useDebounceLazy()

  // debounce
  useEffect(() => {
    const handler = setTimeout(() => dispatch(setSearchValue(searchStr)), 300)

    return () => clearTimeout(handler)
  }, [searchStr])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchStr(value)
    // dispatch(setSearchValue(debounce(value)))
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  
  return (
    <div className={styles.search}>
      <TrianglesIcon />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.text}
          type="text"
          width={158}
          placeholder="Поиск по объявлениям"
          name="search"
          onChange={handleChange}
          value={searchStr}
        ></input>
        <Button>Найти</Button>
      </form>
    </div>
  )
}
