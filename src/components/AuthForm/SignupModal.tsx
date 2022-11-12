import React, { FC } from 'react'
import { Button } from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import styles from './style.module.css'
import LogoIcon from '../../icons/Logo/LogoIcon'
import { Modal } from '../Modal/Modal'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { hideModals, selectModal } from '../../slices/modalSlice'
import { ROUTES } from '../../routes'

type Props = {
  isOpen?: boolean
}

export const SignupModal: FC<Props> = ({ isOpen = false }) => {
  const modalShownName = useAppSelector(selectModal)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('SignupModal: handleSubmit')
    dispatch(hideModals())
    navigate(ROUTES.profile)
  }

  return (
    <Modal isModalOpenArg={modalShownName === 'signup'}>
      <form className={styles.signup} onSubmit={handleSubmit}>
        <div className={styles.logo}>
          <LogoIcon />
        </div>
        <input className={styles.input}
          type="text"
          placeholder="email"
          autoFocus
        />
        <input className={styles.input}
          type="password"
          placeholder="Пароль"
        />
        <input className={styles.input}
          type="password"
          placeholder="Повторите пароль"
        />
        <input className={styles.input}
          type="text"
          placeholder="Имя (необязательно)"
        />
        <input className={styles.input}
          type="text"
          placeholder="Фамилия (необязательно)"
        />
        <input className={styles.input}
          type="text"
          placeholder="Город (необязательно)"
        />
        <Button style={{ width: 278, height: 52, marginTop: 30 }}>
          Зарегистрироваться
        </Button>
      </form>
    </Modal>
  )
}
