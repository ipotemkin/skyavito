import React, { FC } from 'react'
import { LogoMob } from '../LogoMob/LogoMob'

import styles from './style.module.css'

type Props = {
  search?: boolean
}

export const SearchMob: FC<Props> = ({ search = false }) => {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <LogoMob />
        {search && 
        <form className={styles.form}>
          <input className={styles.text} type="text" width={158} placeholder="Поиск" name="search"></input>
        </form>}
      </div>
    </div>
  )
}
