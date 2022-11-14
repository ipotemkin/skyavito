import React from 'react'
import HomeIcon from '../../icons/Home/HomeIcon'
import NewIcon from '../../icons/New/NewIcon'
import ProfileIcon from '../../icons/Profile/ProfileIcon'

import styles from './style.module.css'

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <HomeIcon />
      <NewIcon />
      <ProfileIcon />
    </div>
  )
}
