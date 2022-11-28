import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '../../routes'
import { CardType } from '../../types'

import styles from './style.module.css'

type Props = {
  card: CardType
}

export const Card: FC<Props> = ({ card }) => {
  const path = ROUTES.adPage + '/' + card.id

  return (
    <div className={styles.card}>
      <Link to={path}>
        <div className={styles.image}>
          <img src={card.image} />
        </div>
      </Link>
      <div className={styles.info}>
        <Link to={path}>
          <h3 className={styles.title}>{ card.title }</h3>
        </Link>
        <p className={styles.price}>{ Math.round(card.price * 60).toLocaleString() }&nbsp;₽</p>
        <p className={styles.place}>{card.place }</p>
        <p className={styles.date}>Сегодня в&nbsp;10:45</p>
      </div>
    </div>
  )
}