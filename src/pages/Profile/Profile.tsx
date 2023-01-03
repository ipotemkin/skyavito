import React from 'react'

import { useGetUserQuery } from '../../api/products.api'
import { EditProfile } from '../../components/EditProfile/EditProfile'
import { MyGoods } from '../../components/MyGoods/MyGoods'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { Page } from '../Page/Page'

// import styles from './style.module.css'

export const Profile = () => {
  const { data: user, isLoading, error } = useGetUserQuery(0, { refetchOnMountOrArgChange: true })
  const header = `Здравствуйте, ${user?.name || user?.email}!`
  
  // useEffect(() => {
  //   refetch()
  // }, [])
  if (isLoading && !error) return <h2>Загрузка...</h2>

  if (error) return <h2>{JSON.stringify(error)}</h2>
  // {
  //   if ('status' in error && error.status === 401) {
  //     dispatch(deleteTokens())
  //     navigate(ROUTES.login)
  //   } else return <h2>{JSON.stringify(error)}</h2>
  // }
  
  return (
    <Page mode="subheader">
      <PageTitle>{header}</PageTitle>
      <EditProfile />
      <MyGoods />
    </Page>
  )
}
