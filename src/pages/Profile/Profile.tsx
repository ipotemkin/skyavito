import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { EditProfile } from '../../components/EditProfile/EditProfile'
import { Gallery } from '../../components/Gallery/Gallery'
import { Header } from '../../components/Header/Header'
import { goods } from '../../fixtures/goods'
import TrianglesIcon from '../../icons/Triangles/TrianglesIcon'
import { ROUTES } from '../../routes'

import styles from './style.module.css'

export const Profile = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Header />
      <div style={{ paddingTop: 122 }}></div>
      <div className={styles.sub_header}>
        <TrianglesIcon />
        <Button width={246} onClick={() => navigate(ROUTES.home)}>Вернуться на&nbsp;главную</Button>
      </div>
      <div className={styles.container}>
        <h2 className={styles.h2}>Здравствуйте, !</h2>
        <h3>Настройки профиля</h3>
        <EditProfile />
        <h3>Мои товары</h3>
        <Gallery items={goods} />
      </div>
    </div>
  )
}
