import React from 'react'

import { Header } from '../../components/Header/Header'
import { SellerGoods } from '../../components/SellerGoods/SellerGoods'
import { SellerProfileBlock } from '../../components/SellerProfileBlock/SellerProfileBlock'
import { SubHeader } from '../../components/SubHeader/SubHeader'

import styles from './style.module.css'

export const SellerProfile = () => {
  return (
    <div>
      <Header />
      <SubHeader />
      <div className={styles.container}>
        <h2 className={styles.h2}>Профиль продавца</h2>
        <SellerProfileBlock />
        <SellerGoods />
      </div>
    </div>
  )
}
