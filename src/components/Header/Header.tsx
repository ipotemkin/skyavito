import React from 'react'
import { Button } from '../Button/Button'

import styles from './style.module.css'

export const Header = () => {
  return (
    <nav className={styles.header}>                    
      <Button type="secondary" width={234}>Разместить объявление</Button>
      <Button type="secondary" width={176}>Личный кабинет</Button>
      <Button type="secondary" width={226}>Вход в личный кабинет</Button>
    </nav>
  )
}