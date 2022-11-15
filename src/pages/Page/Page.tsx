import React, { FC, ReactNode } from 'react'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { Search } from '../../components/Search/Search'
import { SearchMob } from '../../components/SearchMob/SearchMob'
import { SubHeader } from '../../components/SubHeader/SubHeader'

import styles from './style.module.css'

type Props = {
  children?: ReactNode
  mode?: 'search' | 'subheader'
}

export const Page: FC<Props> = ({ children, mode = 'search' }) => {
  return (
    <div className={styles.page}>
      <header><Header /></header>
      <div className={styles.desktop}>
        {mode === 'search' && <Search />}
        {mode !== 'search' && <SubHeader />}
      </div>
      <div className={styles.mobile}>
        <SearchMob />
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
      <footer><Footer /></footer>
    </div>
  )
}
