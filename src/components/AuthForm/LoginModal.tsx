import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

import LogoIcon from '../../icons/Logo/LogoIcon'
import { Page } from '../../pages/Page/Page'
import { ROUTES } from '../../routes'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { AuthInput } from './AuthInput'

import styles from './style.module.css'

type Props = {
  isOpen?: boolean
  handleOpen?: VoidFunction
}

export const LoginModal: FC<Props> = ({ isOpen = false, handleOpen = () => void {} }) => {
  const location = useLocation()
  const background = location.state && location.state.background
    ? location.state.background
    : location
  
  // const navigate = useNavigate()
  // const dispatch = useAppDispatch()
  // const modalShownName = useAppSelector(selectModal)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('LoginModal: handleSubmit')
  }

  // const handleRegister = () => {
  //   dispatch(showModal('signup'))
  // }

  return (
    // <Modal isModalOpenArg={modalShownName === 'login'}>
    <Modal isModalOpenArg={true}>
      <Page mode="mobOnly">
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.logo}>
            <LogoIcon />
          </div>
          <AuthInput placeholder="email" autoFocus />
          <AuthInput type="password" placeholder="Пароль" />
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
