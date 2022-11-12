import React from 'react'
import { useNavigate } from 'react-router-dom'

import TrianglesIcon from '../../icons/Triangles/TrianglesIcon'
import { ROUTES } from '../../routes'
import { Button } from '../Button/Button'

import styles from './style.module.css'

export const SubHeader = () => {
  const navigate = useNavigate()

  const handleClick = () => navigate(ROUTES.home)

  return (
    <div className={styles.sub_header}>
      <TrianglesIcon />
      <Button width={246} onClick={handleClick}>
        Вернуться&nbsp;на&nbsp;главную
      </Button>
    </div>
  )
}
