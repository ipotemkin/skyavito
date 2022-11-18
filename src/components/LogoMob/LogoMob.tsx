import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/appHooks'

import TrianglesIcon from '../../icons/Triangles/TrianglesIcon'
import { ROUTES } from '../../routes'
import { hideModals } from '../../slices/modalSlice'

import styles from './style.module.css'

export const LogoMob = () => {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(hideModals())
  }

  return (
    <Link className={styles.logoMob} to={ROUTES.home} onClick={handleClick}>
      <TrianglesIcon width={20} height={14}/>
    </Link>
  )
}
