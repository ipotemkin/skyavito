import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/appHooks'
import { ROUTES } from '../../routes'
import { deleteTokens, selectAccessToken } from '../../slices/tokenSlice'
import { Button } from '../Button/Button'

import styles from './style.module.css'

export const Header = () => {
  const token = useAppSelector(selectAccessToken)
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    setTimeout(() => dispatch(deleteTokens()), 100)
    navigate(ROUTES.home)
  }

  return (
    <nav className={styles.header}>
      <div className={styles.container}>
        
        {token && <Link to={ROUTES.newAd} state={{ background: location }}>
          <Button
            type="secondary"
            width={234}
          >Разместить&nbsp;объявление</Button>
        </Link>}
        
        {token
          ? <Link to={ROUTES.profile}>
            <Button type="secondary" width={176}>
              Личный&nbsp;кабинет
            </Button>
          </Link>
          : <Link to={ROUTES.login} state={{ background: location }}>
            <Button type="secondary" width={226}>
              Вход&nbsp;в&nbsp;личный&nbsp;кабинет
            </Button>
        </Link>}

        {token && <Button type="secondary" onClick={handleLogout}>Logout</Button>}

      </div>
    </nav>
  )
}