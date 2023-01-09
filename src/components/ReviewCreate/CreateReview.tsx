import React, { useState } from "react"
import { useCreateReviewMutation } from "../../api/products.api"
import { Button } from "../Button/Button"

import styles from './style.module.css'

type Props = {
  adId: number
}

export const CreateReview = ({ adId }: Props) => {
  const [isBlocked, setIsBlocked] = useState(false)
  const [review, setReview] = useState('')
  const [createReview] = useCreateReviewMutation()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsBlocked(true)
    try {
      await createReview({ id: adId, body: { text: review }}).unwrap()
      setReview('')
    } catch (error) {
      console.error(error)
    }
    setIsBlocked(false)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
    <div className={styles.formBlock}>
      <label htmlFor="text">Добавить отзыв</label>                            
      <textarea className={styles.area}
        rows={10}
        placeholder="Введите отзыв"
        onChange={handleChange}
        value={review}
      />
    </div>
    <div className={styles.formBlock}></div>
    <Button
      size="ml"
      disabled={review.length && !isBlocked ? false : true}
    >
      Опубликовать
    </Button>            
  </form>
  )
}