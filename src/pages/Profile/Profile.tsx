import React from 'react'
import { useGetUserQuery } from '../../api/products.api'

import { EditProfile } from '../../components/EditProfile/EditProfile'
import { MyGoods } from '../../components/MyGoods/MyGoods'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { Page } from '../Page/Page'

// import styles from './style.module.css'

export const Profile = () => {
  const { data: user, isLoading } = useGetUserQuery(0, { refetchOnMountOrArgChange: true })
  // console.log(user)
  const header = `Здравствуйте, ${user?.name || user?.email}!`

  // useEffect(() => {
  //   refetch()
  // }, [])
  if (isLoading) return <h2>Загрузка...</h2>

  return (
    <Page mode="subheader">
      <PageTitle>{header}</PageTitle>
      <EditProfile />
      <MyGoods />
    </Page>
  )
}
