import React from 'react'
import { goods } from '../../fixtures/goods'
import { Gallery } from '../Gallery/Gallery'

import styles from './style.module.css'

export const MyGoods = () => {
  return (
    <div>
      <h3 className={styles.title}>Мои товары</h3>
      <Gallery items={goods} />
    </div>
  )
}
