import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useCreateReviewMutation, useGetUserQuery } from '../../api/products.api'
import CrossIcon from '../../icons/Cross/CossIcon'
import { Page } from '../../pages/Page/Page'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { ReviewList } from '../ReviewList/ReviewList'

import styles from './style.module.css'

export const ReviewModal = () => {
  const id = Number(useParams().id)
  const navigate = useNavigate()
  const [review, setReview] = useState('')
  const { data: user } = useGetUserQuery(0)
  const [createReview] = useCreateReviewMutation()
  const [isBlocked, setIsBlocked] = useState(false)

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('close btn')
    navigate(-1)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsBlocked(true)
    try {
      await createReview({ id, body: { text: review }}).unwrap()
      setReview('')
    } catch (error) {
      console.error(error)
    }
    setIsBlocked(false)
  }
  
  return (
    <Modal isModalOpenArg={true}>
      <Page mode="modal">
        <div className={styles.modal__content}>
          <h3 className={styles.title}>Отзывы о товаре</h3>
          <div className={styles.btnClose} onClick={handleClose}>
            <CrossIcon width={30} height={30}/>
          </div>

            {user && <form className={styles.form} onSubmit={handleSubmit}>
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
            </form>}

          <div className={styles.reviewsContainer}>
            <ReviewList adId={id}/>
          </div>
        </div>
      </Page>
    </Modal>
  )
}
