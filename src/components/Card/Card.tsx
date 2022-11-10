import React from 'react'

import styles from './style.module.css'

export const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        {/* <a href="#" target="_blank">
          <img src="#" alt="picture">
        </a> */}
      </div>
      <div>
        <a href="" target="_blank">
          <h3 className={styles.title}>Ракетка для большого тенниса Triumph Pro ST</h3>
        </a>
        <p className={styles.price}>2&nbsp;200&nbsp;₽</p>
        <p className={styles.place}>Санкт Петербург</p>
        <p className={styles.date}>Сегодня в&nbsp;10:45</p>
      </div>
    </div>
  )
}