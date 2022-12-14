import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppSelector } from '../../../hooks/appHooks'
import CrossIcon from '../../../icons/Cross/CossIcon'
import { Page } from '../../../pages/Page/Page'
import { selectAccessToken } from '../../../slices/tokenSlice'
import { Modal } from '../../layout/Modal/Modal'
import { ReviewList } from '../../../components/ui/ReviewList/ReviewList'
import { CreateReview } from '../../../components/ui/ReviewCreate/CreateReview'

import styles from './style.module.css'
import { ModalTitle } from '../../../components/ui/ModalTitle/ModalTitle'

export const ReviewModal = () => {
  const adId = Number(useParams().id)
  const navigate = useNavigate()
  const token = useAppSelector(selectAccessToken)

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(-1)
  }
  
  return (
    <Modal isModalOpenArg={true}>
      <Page mode="modal">
        <div className={styles.modal__content}>
          <ModalTitle>Отзывы о товаре</ModalTitle>
          <div className={styles.btnClose} onClick={handleClose}>
            <CrossIcon width={30} height={30}/>
          </div>

          {token && <CreateReview adId={adId} />}

          <div className={styles.reviewsContainer}>
            <ReviewList adId={adId}/>
          </div>
        </div>
      </Page>
    </Modal>
  )
}
