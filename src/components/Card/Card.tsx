import React from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../constants'

import { ROUTES } from '../../routes'
import { CardType } from '../../types'
import { prettyDate } from '../../utils'

import styles from './style.module.css'

type Props = {
  card: CardType
}

export const Card = ({ card }: Props) => {
  const path = ROUTES.adPage + '/' + card.id

  const image = card.images && card.images[0] ? API_URL + card.images[0].url : undefined
  // console.log(image)

  return (
    <div className={styles.card}>
      <Link to={path}>
        <div className={styles.image}>
          <img src={image} />
        </div>
      </Link>
      <div className={styles.info}>
        <Link to={path}>
          <h3 className={styles.title}>{ card.title }</h3>
        </Link>
        <p className={styles.price}>{ card.price.toLocaleString() }&nbsp;₽</p>
        <p className={styles.place}>{ card.user?.city }</p>
        {/* <p className={styles.date}>Сегодня в&nbsp;10:45</p> */}
        {/* <p className={styles.date}>{ String(new Date(String(card.created_on)).toLocaleString()) }</p> */}
        <p className={styles.date}>{ prettyDate(String(card.created_on)) }</p>
      </div>
    </div>
  )
}