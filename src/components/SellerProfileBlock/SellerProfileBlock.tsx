import cn from 'classnames'
import React from 'react'

import { User } from '../../types'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'

import styles from './style.module.css'

type Props = {
  seller?: User
}

export const SellerProfileBlock = ({ seller }: Props) => {
  if (!seller) return <h2>Ошибка загрузки информации о продавце</h2>
  
  return (
    <div className={styles.profileSellerBlock}>
      <div className={cn(styles.left, styles.desktop)}>
        <Avatar image={seller.avatar} />
      </div>
      <div className={styles.right}>
        <h3 className={styles.title}>{seller.name || seller.email}</h3>
        <p className={styles.city}>{seller.city}</p>
        <p className={styles.inf}>Продает товары с {seller.sells_from}</p>
        
        <div className={styles.mob}>
          <Avatar image={seller.avatar} />
        </div>

        <Button>
          Показать&nbsp;телефон<br/><span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>          
        </Button>
      </div>
    </div>
  )
}
