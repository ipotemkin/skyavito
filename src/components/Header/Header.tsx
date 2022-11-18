import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { ROUTES } from '../../routes'
import { Button } from '../Button/Button'

import styles from './style.module.css'

export const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

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
          width={180}
          onClick={handleGoToAdPage}
        >Объявление</Button>

        <Link to={ROUTES.newAd} state={{ background: location }}>
          <Button
            type="secondary"
            width={234}
          >Разместить объявление</Button>
        </Link>
        
        <Button
          type="secondary"
          width={176}
          onClick={handleGoToProfile}
        >Личный кабинет</Button>
        
        <Link to={ROUTES.login} state={{ background: location }}>
          <Button
            type="secondary"
            width={226}
          >Вход в личный кабинет</Button>
        </Link>
      </div>
    </nav>
  )
}