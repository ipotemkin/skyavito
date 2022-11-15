import React from 'react'

import { EditProfile } from '../../components/EditProfile/EditProfile'
import { MyGoods } from '../../components/MyGoods/MyGoods'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { Page } from '../Page/Page'

// import styles from './style.module.css'

export const Profile = () => {
  return (
    <Page mode="subheader">
      <PageTitle>Здравствуйте, !</PageTitle>
      <EditProfile />
      <MyGoods />
    </Page>
  )
}
