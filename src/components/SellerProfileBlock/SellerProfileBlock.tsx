import React from 'react'
import cn from 'classnames'

import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'

import styles from './style.module.css'

export const SellerProfileBlock = () => {
  return (
    <div className={styles.profileSellerBlock}>
      <div className={cn(styles.left, styles.desktop)}>
        <Avatar />
      </div>
      <div className={styles.right}>
        <h3 className={styles.title}>Кирилл Матвеев</h3>
        <p className={styles.city}>Санкт-Петербург</p>
        <p className={styles.inf}>Продает товары с августа 2021</p>
        
        <div className={styles.mob}>
        <Avatar />
        </div>

        <Button>
          Показать&nbsp;телефон<br/><span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>          
        </Button>
      </div>
    </div>
  )
}
