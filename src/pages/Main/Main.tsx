import React from 'react'
import { Gallery } from '../../components/Gallery/Gallery'
import { Header } from '../../components/Header/Header'
import { Search } from '../../components/Search/Search'
import { goods } from '../../fixtures/goods'

import styles from './style.module.css'

export const Main = () => {
  return (
    <div>
      <Header />
      <Search />
      <div className={styles.container}>
        <h2 className={styles.h2}>Объявления</h2>
        <div className={styles.content}>
          {/* <Card /> */}
          <Gallery items={goods} />
        </div>
      </div>
    </div>
  )
}