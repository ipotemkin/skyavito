import React, { useState } from 'react'

import CrossIcon from '../../icons/Cross/CossIcon'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { ReviewList } from '../ReviewList/ReviewList'
import styles from './style.module.css'

export const ReviewModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [review, setReview] = useState('')

  const handleClose = () => {
    console.log('close btn')
    setIsModalOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value)
  }
  
  return (
    <Modal isModalOpenArg={isModalOpen}>
      <div className={styles.modal__content}>
        <h3 className={styles.title}>Отзывы о товаре</h3>
        <div className={styles.btnClose} onClick={handleClose}>
          <CrossIcon width={30} height={30}/>
        </div>
        <form className={styles.form}>
            <div className={styles.formBlock}>
              <label htmlFor="text">Добавить отзыв</label>                            
              <textarea className={styles.area}
                rows={10}
                placeholder="Введите отзыв"
                onChange={handleChange}
                value={review}
              />
            </div>
            <div className={styles.formBlock}>
            </div>
            <Button width={200} disabled={review.length ? false : true}>Опубликовать</Button>            
        </form>
        <div className={styles.reviewsContainer}>
          <ReviewList />
        </div>
    </div>
    </Modal>
  )
}
