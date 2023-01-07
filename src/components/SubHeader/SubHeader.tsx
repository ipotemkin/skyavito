import React from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '../../routes'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'

import styles from './style.module.css'

export const SubHeader = () => (
  <div className={styles.sub_header}>
    <Logo />
    <Link to={ROUTES.home}>
      <Button width={246}>
        Вернуться&nbsp;на&nbsp;главную
      </Button>
    </Link>
  </div>
)
