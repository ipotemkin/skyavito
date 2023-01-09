import React from 'react'

import { useSearch } from '../../hooks/useSearch'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'

import styles from './style.module.css'

export const Search = () => {
  const { data, handleChange } = useSearch()

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => e.preventDefault()
  
  return (
    <div className={styles.search}>
      <Logo />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.text}
          type="text"
          width={158}
          placeholder="Поиск по объявлениям"
          name="search"
          onChange={handleChange}
          value={data || ''}
        />
        <Button>Найти</Button>
      </form>
    </div>
  )
}
