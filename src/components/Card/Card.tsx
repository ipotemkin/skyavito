import React, { FC } from 'react'

import { CardType } from '../../types'

import styles from './style.module.css'

type Props = {
  card: CardType
}

export const Card: FC<Props> = ({ card }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={card.image} />
      </div>
      <div className={styles.info}>
        <a href="" target="_blank">
          <h3 className={styles.title}>{ card.title }</h3>
        </a>
        <p className={styles.price}>{ card.price }&nbsp;₽</p>
        <p className={styles.place}>{card.place }</p>
        <p className={styles.date}>Сегодня в&nbsp;10:45</p>
      </div>
    </div>
  )
}