import React, { FC } from 'react'

import { CardType } from '../../types'
import { Card } from '../Card/Card'

import styles from './style.module.css'

type Props = {
  items: CardType[]
}

export const Gallery: FC<Props> = ({ items }) => {
  if (items.length === 0) return <h2>Ничего не найдено...</h2>
  
  return (
    <div className={styles.gallery}>
      {items && items.map((item: CardType) => <Card
        key={item.title}
        card={item}
      />)}   
    </div>
  )
}
