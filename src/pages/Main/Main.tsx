import React from 'react'
import { Card } from '../../components/Card/Card'
import { Header } from '../../components/Header/Header'
import { Search } from '../../components/Search/Search'

import styles from './style.module.css'

export const Main = () => {
  return (
    <div>
      <Header />
      <Search />
      <div className={styles.container}>
        <h2 className={styles.h2}>Объявления</h2>
        <div className={styles.content}>
          <Card />
        
        </div>
      </div>
    </div>
  )
}