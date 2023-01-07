import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../routes'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'

import styles from './style.module.css'

export const SubHeader = () => {
  const navigate = useNavigate()

  const handleClick = () => navigate(ROUTES.home)

  return (
    <div className={styles.sub_header}>
      <Logo />
      <Button width={246} onClick={handleClick}>
        Вернуться&nbsp;на&nbsp;главную
      </Button>
    </div>
  )
}
