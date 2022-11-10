import React from 'react'
import TrianglesIcon from '../../icons/Triangles/TrianglesIcon'
import { Button } from '../Button/Button'

import styles from './style.module.css'

export const Search = () => {
  return (
    <div className={styles.search}>
      <TrianglesIcon />
      <form className={styles.form}>
        <input className={styles.text} type="text" width={158} placeholder="Поиск по объявлениям" name="search"></input>
        <Button>Найти</Button>
      </form>
    </div>
  )
}
