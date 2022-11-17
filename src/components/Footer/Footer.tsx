import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../app/hooks'
import HomeIcon from '../../icons/Home/HomeIcon'
import NewIcon from '../../icons/New/NewIcon'
import ProfileIcon from '../../icons/Profile/ProfileIcon'
import { ROUTES } from '../../routes'
import { hideModals, showModal } from '../../slices/modalSlice'

import styles from './style.module.css'

export const Footer = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleGoToHome = () => {
    dispatch(hideModals())
    navigate(ROUTES.home)
  }

  const handleGoToNewAd = () => {
    dispatch(hideModals())
    dispatch(showModal('newAd'))
  }

  const handleGoToProfile = () => {
    dispatch(hideModals())
    navigate(ROUTES.profile)
  }

  return (
    <div className={styles.footer}>
      <HomeIcon onClick={handleGoToHome}/>
      <NewIcon onClick={handleGoToNewAd}/>
      <ProfileIcon onClick={handleGoToProfile}/>
    </div>
  )
}
