import React, { FC} from 'react'
import { Button } from '../Button/Button'

import styles from './style.module.css'
import LogoIcon from '../../icons/Logo/LogoIcon'
import { Modal } from '../Modal/Modal'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectModal, showModal } from '../../slices/modalSlice'

type Props = {
  isOpen?: boolean
  handleOpen?: VoidFunction
}

export const LoginModal: FC<Props> = ({ isOpen = false, handleOpen = () => void {} }) => {
  const dispatch = useAppDispatch()
  const modalShownName = useAppSelector(selectModal)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('LoginModal: handleSubmit')
  }

  const handleRegister = () => {
    dispatch(showModal('signup'))
  }

  return (
    <Modal isModalOpenArg={modalShownName === 'login'}>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <Button style={{ marginTop: 30, marginBottom: 20, width: 278, height: 52 }}>
          Войти
        </Button>
        <Button type="outlined" style={{ width: 278, height: 52 }}
          onClick={handleRegister}
        >
          Зарегистрироваться
        </Button>
      </form>
    </Modal>
  )
}
