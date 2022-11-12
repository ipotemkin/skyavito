import React from 'react'
import { goods } from '../../fixtures/goods'
import { Gallery } from '../Gallery/Gallery'

import styles from './style.module.css'

export const SellerGoods = () => {
  return (
    <div>
      <h3 className={styles.title}>Товары продавца</h3>
      <Gallery items={goods} />
    </div>
  )
}
