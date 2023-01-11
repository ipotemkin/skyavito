import cn from 'classnames'
import React from 'react'

import { User } from '../../types'
import { formatSellsFrom } from '../../utils'
import { Avatar } from '../../components/ui/Avatar/Avatar'
import { ButtonWithPhone } from '../../components/ui/ButtonWithPhone/ButtonWithPhone'

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
        <p className={styles.inf}>Продает товары с {formatSellsFrom(seller.sells_from || '')}</p>
        
        <div className={styles.mob}>
          <Avatar image={seller.avatar} />
        </div>

        <ButtonWithPhone phone={seller.phone} />
      </div>
    </div>
  )
}
