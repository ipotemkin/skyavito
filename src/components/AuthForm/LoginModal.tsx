import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'

import { useLoginMutation } from '../../api/products.api'
import { getErrorMessage } from '../../api/utils'
import LogoIcon from '../../icons/Logo/LogoIcon'
import { Page } from '../../pages/Page/Page'
import { ROUTES } from '../../routes'
import { Credentials } from '../../types'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'

import styles from './style.module.css'

const validEmail = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,3}$/i)

export const LoginModal = () => {
  const [isBlocked, setIsBlocked] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({ mode: 'onTouched' })

  const [login] = useLoginMutation()

  const location = useLocation()
  const background = location.state && location.state.background
    ? location.state.background
    : location
  
  const focusHandler = () => setError('')
  
  const onSubmit: SubmitHandler<Credentials> = async (data) => {
    setIsBlocked(true)
    setError('')
    console.log('onSubmit')

    try {
      const resp = await login({ email: data.email, password: data.password }).unwrap()
      // navigate(ROUTES.profile)
      console.log(resp)
    } catch (error) {
      setError(getErrorMessage(error as FetchBaseQueryError))
      setIsBlocked(false)
    }
  }
  
  return (
    <Modal isModalOpenArg={true}>
      <Page mode="modal">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.logo}>
            <LogoIcon />
          </div>
          <input className={styles.input}
            onFocus={focusHandler}
            placeholder="email"
            autoFocus
            {...register('email', {
              required: 'Введите e-mail',
              pattern: {
                value: validEmail,
                message: 'Введите корректный e-mail',
              },
            })}
            />
          <p className={styles.error}>
            {errors.email && <span>{errors.email.message}</span>}
          </p>
          <input className={styles.input}
            onFocus={focusHandler}
            type="password"
            placeholder="Пароль"
            {...register('password', {
              required: 'Введите пароль',
            })}
            />
          <p className={styles.error}>
            {errors.password && <span>{errors.password.message}</span>}
          </p>
          <p className={styles.error}>
            {error && <span>{error}</span>}
          </p>

          <div className={styles.horDiv}></div>
          <Button
            style={{ marginBottom: 20, width: 278, height: 52 }}
            disabled={isBlocked ? true : false}            
          >
            Войти
          </Button>
          <Link to={ROUTES.signup} state={{ background }}>
            <Button
              type="outlined"
              style={{ width: 278, height: 52 }}
            >
              Зарегистрироваться
            </Button>
          </Link>
        </form>
      </Page>
    </Modal>
  )
}
