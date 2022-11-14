import React from 'react'
import { LogoMob } from '../LogoMob/LogoMob'

import styles from './style.module.css'

export const SearchMob = () => {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <LogoMob />
        <form className={styles.form}>
          <input className={styles.text} type="text" width={158} placeholder="Поиск" name="search"></input>
        </form>
      </div>
    </div>
  )
}
