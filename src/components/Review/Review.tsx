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
        <Avatar size="s" image={review.author.avatar}/>
      </div>
      <div className={styles.right}>
        <p className={cn(styles.name, styles.fontT)}>
          {review.author.name || review.author.email} <span>{prettyDate(review.created_on)}</span>
        </p>
        {/* <h5 className={cn(styles.title, styles.fontT)}>Комментарий</h5> */}
        <p className={cn(styles.text, styles.fontT)}>{review.text}</p>

      </div>
    </div>
  )
}
