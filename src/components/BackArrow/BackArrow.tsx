import React from 'react'
import { useNavigate } from 'react-router-dom'

import BackIcon from '../../icons/Back/BackIcon'

import styles from './style.module.css'

export const BackArrow = () => {
  const navigate = useNavigate()

  const handleClick = () => navigate(-1)

  return (
    <div className={styles.mobile}>
      <BackIcon onClick={handleClick} stroke="black" />
    </div>
  )
}
