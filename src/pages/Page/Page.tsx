import React, { FC, ReactNode } from 'react'

import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { Search } from '../../components/Search/Search'
import { HeaderMob } from '../../components/HeaderMob/HeaderMob'
import { SubHeader } from '../../components/SubHeader/SubHeader'
import { useAppSelector } from '../../hooks/appHooks'
import { selectModal } from '../../slices/modalSlice'

import styles from './style.module.css'

type Props = {
  children?: ReactNode
  mode?: 'search' | 'subheader' | 'modal'
  mobSearch?: boolean
}

export const Page: FC<Props> = ({ children, mode = 'search', mobSearch = false }) => {
  const mod = useAppSelector(selectModal)

  return (
    <div className={styles.outerPage}>
      {/* если хотим сделать невидимым фон, то пишем значение в mod */}
      <div className={mod && mode !== 'modal' ? styles.none : styles.page}>
        <div className={styles.desktop}>
          {mode !== 'modal' && <Header />}
          {mode === 'search' && <Search />}
          {!['search', 'modal'].includes(mode) && <SubHeader />}
        </div>
        <div className={styles.mobile}>
          <HeaderMob search={mobSearch}/>
        </div>
        <div className={mode === 'modal' ? styles.containerModal: styles.container}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
        <footer><Footer /></footer>
      </div>
    </div>
  )
}
