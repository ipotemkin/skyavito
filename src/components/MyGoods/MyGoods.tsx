import React from 'react'

import { useGetMyAdsQuery } from '../../api/products.api'
import { Gallery } from '../Gallery/Gallery'
import { PageSubTitle } from '../PageSubTitle/PageSubTitle'

export const MyGoods = () => {
  const { data, isLoading } = useGetMyAdsQuery(0, { refetchOnMountOrArgChange: true })

  if (isLoading) return <h2>Загрузка...</h2>

  if (!data) return <h2>Ошибка загрузки</h2>

  return (
    <div>
      <PageSubTitle>Мои товары</PageSubTitle>
      <Gallery items={data} />
    </div>
  )
}
