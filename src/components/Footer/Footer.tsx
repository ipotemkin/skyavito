import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import HomeIcon from '../../icons/Home/HomeIcon'
import NewIcon from '../../icons/New/NewIcon'
import ProfileIcon from '../../icons/Profile/ProfileIcon'
import { ROUTES } from '../../routes'

import styles from './style.module.css'

export const Footer = () => {
  const location = useLocation()

  return (
    <div className={styles.footer}>
      <Link to={ROUTES.home}>
        <HomeIcon />
      </Link>
      
      <Link to={ROUTES.newAd} state={{ background: location }}>
        <NewIcon />
      </Link>
      
      <Link to={ROUTES.profile}>
        <ProfileIcon />
      </Link>
    </div>
  )
}
