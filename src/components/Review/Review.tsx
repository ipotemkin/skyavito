import cn from 'classnames'
import React from 'react'

import { Avatar } from '../Avatar/Avatar'

import styles from './style.module.css'

export const Review = () => {
  return (
    <div className={styles.review}>
      <div className={styles.left}>
        <Avatar size="s" />
      </div>
      <div className={styles.right}>
        <p className={cn(styles.name, styles.fontT)}>Олег <span>14 августа</span></p>
        <h5 className={cn(styles.title, styles.fontT)}>Комментарий</h5>
        <p className={cn(styles.text, styles.fontT)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>
  )
}
