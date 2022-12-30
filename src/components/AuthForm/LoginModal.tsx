import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { format } from 'path'
import React, { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLoginMutation } from '../../api/products.api'
import { getError } from '../../api/utils'

import LogoIcon from '../../icons/Logo/LogoIcon'
import { Page } from '../../pages/Page/Page'
import { ROUTES } from '../../routes'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { AuthInput } from './AuthInput'

import styles from './style.module.css'

export const LoginModal = () => {
  const [login] = useLoginMutation()
  const formRef = useRef<HTMLFormElement>(null)
  const location = useLocation()
  const background = location.state && location.state.background
    ? location.state.background
    : location
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('LoginModal: handleSubmit')
    const credentials = {
      'email': formRef.current?.email.value,
      'password': formRef.current?.password.value,
    }
    console.log(credentials)
    try {
      const data = await login(credentials).unwrap()
      console.log(data)
    } catch (error) {
      console.log('error -->', error)
      console.log(getError(error as FetchBaseQueryError))
    }
  }

  return (
    <Modal isModalOpenArg={true}>
      <Page mode="modal">
        <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.logo}>
            <LogoIcon />
          </div>
          <AuthInput placeholder="email" autoFocus name="email"/>
          <AuthInput type="password" placeholder="Пароль" name="password"/>
          <div className={styles.horDiv}></div>
          <Button style={{ marginBottom: 20, width: 278, height: 52 }}>
            Войти
          </Button>
          <Link to={ROUTES.signup} state={{ background }}>
            <Button type="outlined" style={{ width: 278, height: 52 }}>
              Зарегистрироваться
            </Button>
          </Link>
        </form>
      </Page>
    </Modal>
  )
}
