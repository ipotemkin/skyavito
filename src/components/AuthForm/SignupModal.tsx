import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useSignUpMutation } from '../../api/auth.api'
import { getErrorMessage } from '../../api/utils'
import LogoIcon from '../../icons/Logo/LogoIcon'
import { Page } from '../../pages/Page/Page'
import { ROUTES } from '../../routes'
import { CreateUser } from '../../types'
import { validEmail } from '../../validators/validators'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'

import styles from './style.module.css'

export const SignupModal = () => {
  const [isBlocked, setIsBlocked] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateUser>({ mode: 'onTouched' })

  const [signUp] = useSignUpMutation()

  const navigate = useNavigate()

  const focusHandler = () => setError('')

  const onSubmit: SubmitHandler<CreateUser> = async (data) => {
    setIsBlocked(true)
    setError('')

    try {
      await signUp(data).unwrap()
      navigate(ROUTES.profile)
    } catch (error) {
      console.error(error)
      setError(getErrorMessage(error as FetchBaseQueryError))
      setIsBlocked(false)
    }
  }

  return (
    // <Modal isModalOpenArg={modalShownName === 'signup'}>
    <Modal isModalOpenArg={true}>
      <Page mode="modal">
        <form className={styles.signup} onSubmit={handleSubmit(onSubmit)}>
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

          <input className={styles.input}
            onFocus={focusHandler}
            type="password"
            placeholder="Повторите пароль"
            {...register('passwordRepeat', {
              required: 'Повторите пароль',
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues()
                  return password === value || `Пароли не совпадают`
                },
              },
            })}
          />
          <p className={styles.error}>
            {errors.passwordRepeat && <span>{errors.passwordRepeat.message}</span>}
          </p>

          <input className={styles.input}
            placeholder="Имя (необязательно)"
            {...register('name')}
          />
          <p className={styles.error} />

          <input className={styles.input}
            placeholder="Фамилия (необязательно)"
            {...register('surname')}
          />
          <p className={styles.error} />

          <input className={styles.input}
            placeholder="Город (необязательно)"
            {...register('city')}
          />
          <p className={styles.error} />
          <p className={styles.error}>
            {error && <span>{error}</span>}
          </p>

          <div className={styles.horDiv}></div>
          <Button
            style={{ width: 278, height: 52 }}
            disabled={isBlocked ? true : false}
          >
            Зарегистрироваться
          </Button>
      </form>
      </Page>
    </Modal>
  )
}
