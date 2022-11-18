import React, { FC } from 'react'

import { Review } from '../Review/Review'

import styles from './style.module.css'

type Props = {
  reviews?: number[]
}

export const ReviewList: FC<Props> = () => {
  // const reviews = [1, 2]
  const reviews = [1, 2, 3, 4, 5]
  return (
    <div className={styles.reviewList}>
      {reviews.map((review: number) => <Review key={review} />)}
    </div>
  )
}
