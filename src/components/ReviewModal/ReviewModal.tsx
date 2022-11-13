import React, { FC, useState } from 'react'

import CrossIcon from '../../icons/Cross/CossIcon'
import PlusIcon from '../../icons/Plus/PlusIcon'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { ReviewList } from '../ReviewList/ReviewList'
import styles from './style.module.css'

const adImages = [1, 2, 3, 4, 5]

export const ReviewModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  const handleClose = () => {
    console.log('close btn')
    setIsModalOpen(false)
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
                name="text"
                id="formArea"
                rows={10}
                placeholder="Введите отзыв"
              />
            </div>
            <div className={styles.formBlock}>
            </div>
            <Button width={200} disabled>Опубликовать</Button>            
        </form>
        <div className={styles.reviewsContainer}>
          <ReviewList />
        </div>
    </div>
    </Modal>
  )
}
