import React from 'react'

import { EditProfile } from '../../components/EditProfile/EditProfile'
import { MyGoods } from '../../components/galleries/MyGoods/MyGoods'
import { PageTitle } from '../../components/ui/PageTitle/PageTitle'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { Page } from '../Page/Page'

export const Profile = () => {
  const { data: user, isLoading, error } = useCurrentUser()

  const header = `Здравствуйте, ${user?.name || user?.email}!`
  
  if (isLoading && !error) return <h2>Загрузка...</h2>

  if (error) return <h2>{JSON.stringify(error)}</h2>
  
  return (
    <Page>
      <PageTitle>{header}</PageTitle>
      <EditProfile />
      <MyGoods />
    </Page>
  )
}
