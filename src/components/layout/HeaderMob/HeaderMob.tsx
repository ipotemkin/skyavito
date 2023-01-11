import React, { FC } from 'react'

import { useSearch } from '../../../hooks/useSearch'
import { LogoMob } from '../../../components/ui/Logo/LogoMob'

import styles from './style.module.css'

type Props = {
  search?: boolean
}

export const HeaderMob: FC<Props> = ({ search = false }) => {
  const { data, handleChange } = useSearch()

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <LogoMob />
        {search && 
        <form className={styles.form}>
          <input className={styles.text}
            type="text"
            width={158}
            placeholder="Поиск"
            name="search"
            value={data || ''}
            onChange={handleChange}
          />
        </form>}
      </div>
    </div>
  )
}
