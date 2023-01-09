import React from 'react'

import { useGetMyAdsQuery } from '../../api/products.api'
import { useAdsFiltered } from '../../hooks/adHooks'
import { useAppSelector } from '../../hooks/appHooks'
import { selectSearchValue } from '../../slices/searchSlice'
import { Gallery } from '../Gallery/Gallery'
import { PageSubTitle } from '../PageSubTitle/PageSubTitle'

export const MyGoods = () => {
  const searchValue = useAppSelector(selectSearchValue)
  const { data, isLoading } = useAdsFiltered(
    searchValue, useGetMyAdsQuery, [0, { refetchOnMountOrArgChange: true }]
  )

  if (isLoading) return <h2>Загрузка...</h2>

  if (!data) return <h2>Ошибка загрузки</h2>

  return (
    <div>
      <PageSubTitle>Мои товары</PageSubTitle>
      <Gallery items={data} />
    </div>
  )
}
