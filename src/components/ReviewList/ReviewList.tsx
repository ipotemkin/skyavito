import React, { FC } from 'react'
import { Review } from '../Review/Review'

type Props = {
  reviews?: number[]
}

export const ReviewList: FC<Props> = () => {
  const reviews = [1, 2, 3, 4]
  return (
    <div>
      {reviews.map((review: number) => <Review key={review} />)}
    </div>
  )
}
