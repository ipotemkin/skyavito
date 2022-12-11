import cn from 'classnames'
import React from 'react'

import { Avatar } from '../Avatar/Avatar'
import { Review as ReviewType } from '../../types'
import { prettyDate } from '../../utils'

import styles from './style.module.css'

type Props = {
  review: ReviewType
}

export const Review = ({ review }: Props) => {
  return (
    <div className={styles.review}>
      <div className={styles.left}>
        <Avatar size="s" />
      </div>
      <div className={styles.right}>
        {/* <p className={cn(styles.name, styles.fontT)}>Олег <span>14 августа</span></p>
        <h5 className={cn(styles.title, styles.fontT)}>Комментарий</h5>
        <p className={cn(styles.text, styles.fontT)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}

        <p className={cn(styles.name, styles.fontT)}>
          {review.author.name || review.author.email} <span>{prettyDate(review.created_on)}</span>
        </p>
        <h5 className={cn(styles.title, styles.fontT)}>Комментарий</h5>
        <p className={cn(styles.text, styles.fontT)}>{review.text}</p>

      </div>
    </div>
  )
}
