import React from 'react'

import { useGetAdReviewsQuery } from '../../api/products.api'
import { Review as ReviewType } from '../../types'
import { Review } from '../Review/Review'

import styles from './style.module.css'

type Props = {
  adId: number
  reviews?: number[]
}

export const ReviewList = ({ adId }: Props) => {
  const { data: reviews, isLoading } = useGetAdReviewsQuery(adId)

  if (isLoading)
    return <>Загружаем...</>

  if (!reviews)
    return <>Что-то пошло не так!</>

  if (reviews.length === 0)
    return <>Отзывов пока нет</>

  return (
    <div className={styles.reviewList}>
      {reviews.map((review: ReviewType) => <Review key={review.id} review={review} />)}
    </div>
  )
}
