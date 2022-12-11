import React from 'react'
import { useGetProductCommentsQuery } from '../../api/products.api'
import { Review as ReviewType } from '../../types'

import { Review } from '../Review/Review'

import styles from './style.module.css'

type Props = {
  adId: number
  reviews?: number[]
}

export const ReviewList = ({ adId }: Props) => {
  // const reviews = [1, 2]
  // const reviews = [1, 2, 3, 4, 5]

  const { data: reviews, isLoading } = useGetProductCommentsQuery(adId)

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
