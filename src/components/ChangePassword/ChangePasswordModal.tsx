import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useChangeUserPasswordMutation } from '../../api/products.api'
import { getErrorMessage } from '../../api/utils'
import CrossIcon from '../../icons/Cross/CossIcon'
import LogoIcon from '../../icons/Logo/LogoIcon'
import { Page } from '../../pages/Page/Page'
import { ChangePasswordForm } from '../../types'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'

import styles from './style.module.css'

export const ChangePasswordModal = () => {
  const [isBlocked, setIsBlocked] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ChangePasswordForm>({ mode: 'onTouched' })

  const [changeUserPassword] = useChangeUserPasswordMutation()

  const navigate = useNavigate()

  const focusHandler = () => setError('')

  const handleClose = () => navigate(-1)

  const onSubmit: SubmitHandler<ChangePasswordForm> = async (data) => {
    setIsBlocked(true)
    setError('')

    const { password_1, password_2 } = data

    try {
      await changeUserPassword({ password_1, password_2 }).unwrap()
      navigate(-1)
    } catch (error) {
      console.error(error)
      setError(getErrorMessage(error as FetchBaseQueryError))
      setIsBlocked(false)
    }
  }

  return (
    <Modal isModalOpenArg={true}>
      <Page mode="modal">
        <form className={styles.changePassword} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.btnClose} onClick={handleClose}>
            <CrossIcon width={30} height={30}/>
          </div>

          <div className={styles.logo}>
            <LogoIcon />
          </div>

          <input className={styles.input}
            onFocus={focusHandler}
            type="password"
            placeholder="Пароль"
            {...register('password_1', {
              required: 'Введите текущий пароль',
            })}
          />
          <p className={styles.error}>
            {errors.password_1 && <span>{errors.password_1.message}</span>}
          </p>

          <input className={styles.input}
            onFocus={focusHandler}
            type="password"
            placeholder="Пароль"
            {...register('password_2', {
              required: 'Введите новый пароль',
            })}
          />
          <p className={styles.error}>
            {errors.password_2 && <span>{errors.password_2.message}</span>}
          </p>

          <input className={styles.input}
            onFocus={focusHandler}
            type="password"
            placeholder="Повторите пароль"
            {...register('password_2_repeat', {
              required: 'Повторите пароль',
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password_2 } = getValues()
                  return password_2 === value || `Пароли не совпадают`
                },
              },
            })}
          />
          <p className={styles.error}>
            {errors.password_2_repeat && <span>{errors.password_2_repeat.message}</span>}
          </p>

          <p className={styles.error}>
            {error && <span>{error}</span>}
          </p>

          {/* <div className={styles.horDiv}></div> */}
          <Button
            style={{ width: 278, height: 52 }}
            disabled={isBlocked ? true : false}
          >
            Сменить пароль
          </Button>
      </form>
      </Page>
    </Modal>
  )
}
