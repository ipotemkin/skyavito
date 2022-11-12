import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { ROUTES } from '../../routes'
import { showModal } from '../../slices/modalSlice'
import { Button } from '../Button/Button'

import styles from './style.module.css'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleEnterProfile = () => {
    dispatch(showModal('login'))
  }

  const handleGoToProfile = () => {
    navigate(ROUTES.profile)
  }

  const handleGoToSellerProfile = () => {
    navigate(ROUTES.sellerProfile)
  }

  const handleGoToAdPage = () => {
    navigate(ROUTES.adPage)
  }

  const handleGoToAdMyPage = () => {
    navigate(ROUTES.adMyPage)
  }

  return (
    <nav className={styles.header}>
      <div className={styles.container}>
        <Button
          type="secondary"
          width={234}
          onClick={handleGoToSellerProfile}
        >Профиль продавца</Button>

        <Button
          type="secondary"
          width={234}
          onClick={handleGoToAdMyPage}
        >Мое объявление</Button>


        <Button
          type="secondary"
          width={234}
          onClick={handleGoToAdPage}
        >Разместить объявление</Button>
        
        <Button
          type="secondary"
          width={176}
          onClick={handleGoToProfile}
        >Личный кабинет</Button>
        
        <Button
          type="secondary"
          width={226}
          onClick={handleEnterProfile}
        >Вход в личный кабинет</Button>
      </div>
    </nav>
  )
}