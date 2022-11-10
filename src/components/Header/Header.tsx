import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes'
import { Button } from '../Button/Button'

import styles from './style.module.css'

export const Header = () => {
  const navigate = useNavigate()

  return (
    <nav className={styles.header}>
      <div className={styles.container}>
        <Button type="secondary" width={234}>Разместить объявление</Button>
        <Button type="secondary" width={176} onClick={() => navigate(ROUTES.profile)}>Личный кабинет</Button>
        <Button type="secondary" width={226}>Вход в личный кабинет</Button>
      </div>
    </nav>
  )
}