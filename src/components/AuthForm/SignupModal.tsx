import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import LogoIcon from '../../icons/Logo/LogoIcon'
import { Page } from '../../pages/Page/Page'
import { ROUTES } from '../../routes'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { AuthInput } from './AuthInput'

import styles from './style.module.css'

type Props = {
  isOpen?: boolean
}

export const SignupModal: FC<Props> = ({ isOpen = false }) => {
  // const modalShownName = useAppSelector(selectModal)
  const navigate = useNavigate()
  // const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('SignupModal: handleSubmit')
    // dispatch(hideModals())
    navigate(ROUTES.profile)
  }

  return (
    // <Modal isModalOpenArg={modalShownName === 'signup'}>
    <Modal isModalOpenArg={true}>
      <Page mode="mobOnly">
        <form className={styles.signup} onSubmit={handleSubmit}>
          <div className={styles.logo}>
            <LogoIcon />
          </div>
          <AuthInput placeholder="email" autoFocus />
          <AuthInput type="password" placeholder="Пароль" />
          <AuthInput type="password" placeholder="Повторите пароль" />
          <AuthInput placeholder="Имя (необязательно)" />
          <AuthInput placeholder="Фамилия (необязательно)" />
          <AuthInput placeholder="Город (необязательно)" />
          <div className={styles.horDiv}></div>
          <Button style={{ width: 278, height: 52 }}>
            Зарегистрироваться
          </Button>
      </form>
      </Page>
    </Modal>
  )
}
