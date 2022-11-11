import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { EditProfile } from '../../components/EditProfile/EditProfile'
import { Header } from '../../components/Header/Header'
import { MyGoods } from '../../components/MyGoods/MyGoods'
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
        <Button width={246} onClick={() => navigate(ROUTES.home)}>Вернуться&nbsp;на&nbsp;главную</Button>
      </div>
      <div className={styles.container}>
        <h2 className={styles.h2}>Здравствуйте, !</h2>
        <EditProfile />
        <MyGoods />
      </div>
    </div>
  )
}
