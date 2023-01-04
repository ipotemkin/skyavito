import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGetUserQuery } from '../../api/products.api'
import { Ad } from '../../components/Ad/Ad'

export const AdPage = () => {
  const { id } = useParams()
  const userIdFromParams = Number(id)
  const { data: user, isLoading } = useGetUserQuery(0)
  const [userId, setUserId] = useState<number>()

  useEffect(() => {
    if (user) setUserId(user.id)
  }, [user])

  if (isLoading) return <h2>Загрузка...</h2>

  if (userId === userIdFromParams) return <Ad mode="seller" />

  return <Ad />
}
