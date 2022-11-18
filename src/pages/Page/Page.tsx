import React, { FC, ReactNode } from 'react'
// import cn from 'classnames'

import { useAppSelector } from '../../hooks/appHooks'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { Search } from '../../components/Search/Search'
import { SearchMob } from '../../components/SearchMob/SearchMob'
import { SubHeader } from '../../components/SubHeader/SubHeader'
import { selectModal } from '../../slices/modalSlice'

import styles from './style.module.css'

type Props = {
  children?: ReactNode
  mode?: 'search' | 'subheader' | 'mobOnly'
  search?: boolean
}

export const Page: FC<Props> = ({ children, mode = 'search', search = false }) => {
  const mod = useAppSelector(selectModal)

  return (
    <div className={styles.outerPage}>
      <div className={mod && mode !== 'mobOnly' ? styles.none : styles.page}>
        {mode !== 'mobOnly' && <header><Header /></header>}
        <div className={styles.desktop}>
          {mode === 'search' && <Search />}
          {mode !== 'search' && mode !== 'mobOnly' && <SubHeader />}
        </div>
        <div className={styles.mobile}>
          <SearchMob search={search}/>
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
        <footer><Footer /></footer>
      </div>
    </div>
  )
}
