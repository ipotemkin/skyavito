import React from 'react'

import { EditProfile } from '../../components/EditProfile/EditProfile'
import { Header } from '../../components/Header/Header'
import { MyGoods } from '../../components/MyGoods/MyGoods'
import { SubHeader } from '../../components/SubHeader/SubHeader'

import styles from './style.module.css'

export const Profile = () => {
  return (
    <div>
      <Header />
      <SubHeader />
      <div className={styles.container}>
        <h2 className={styles.h2}>Здравствуйте, !</h2>
        <EditProfile />
        <MyGoods />
      </div>
    </div>
  )
}
