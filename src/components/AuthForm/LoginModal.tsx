import React, { FC} from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../Button/Button'
import styles from './style.module.css'
import LogoIcon from '../../icons/Logo/LogoIcon'
import { Modal } from '../Modal/Modal'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectModal, showModal } from '../../slices/modalSlice'
import { Page } from '../../pages/Page/Page'

type Props = {
  isOpen?: boolean
  handleOpen?: VoidFunction
}

export const LoginModal: FC<Props> = ({ isOpen = false, handleOpen = () => void {} }) => {
  const navigate = useNavigate()
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
    // <Modal isModalOpenArg={modalShownName === 'login'}>
    <Modal isModalOpenArg={true}>
      <Page mode="mobOnly">
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
          <div className={styles.horDiv}></div>
          <Button style={{ marginBottom: 20, width: 278, height: 52 }}>
            Войти
          </Button>
          <Button type="outlined" style={{ width: 278, height: 52 }}
            onClick={handleRegister}
          >
            Зарегистрироваться
          </Button>
        </form>
      </Page>
    </Modal>
  )
}
