import React from 'react'

import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'

import styles from './style.module.css'

export const SellerProfileBlock = () => {
  return (
    <div className={styles.profileSellerBlock}>
      <div className={styles.left}>
        <Avatar />
      </div>
      <div className={styles.right}>
        <h3 className={styles.title}>Кирилл Матвеев</h3>
        <p className={styles.city}>Санкт-Петербург</p>
        <p className={styles.inf}>Продает товары с августа 2021</p>

        <Button width={214}>
          Показать&nbsp;телефон<br/><span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>          
        </Button>
      </div>
    </div>
  )
}
