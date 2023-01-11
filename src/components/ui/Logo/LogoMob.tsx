import React from 'react'
import { Link } from 'react-router-dom'

import TrianglesIcon from '../../../icons/Triangles/TrianglesIcon'
import { ROUTES } from '../../../routes'

import styles from './style.module.css'

export const LogoMob = () => {
  return (
    <Link className={styles.logoMob} to={ROUTES.home}>
      <TrianglesIcon width={20} height={14}/>
    </Link>
  )
}
