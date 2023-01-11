import { skipToken } from '@reduxjs/toolkit/dist/query'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  useGetAdsByUserIdQuery
} from '../../api/products.api'
import { PageTitle } from '../../components/ui/PageTitle/PageTitle'
import { SellerGoods } from '../../components/galleries/SellerGoods/SellerGoods'
import { SellerProfileBlock } from '../../components/SellerProfileBlock/SellerProfileBlock'
import { useAdsFiltered } from '../../hooks/adHooks'
import { User } from '../../types'
import { Page } from '../Page/Page'

export const SellerProfile = () => {
  const sellerId = Number(useParams().id)

  // получаем объявления с учетом фильтра (см. контракт хука useAdsFiltered)
  const { data: ads, isLoading } = useAdsFiltered(
    useGetAdsByUserIdQuery, [sellerId ?? skipToken]
  )

  // формируем объект seller
  // и забираем данные о продавце только при первой загрузке ads,
  // пока еще не установлен фильтр searchValue, иначе возможна ошибка получеия продавца,
  // если при уславноленном фильтре не будет найдено объявлений
  const [seller, setSeller] = useState<User>()
  useEffect(() => {
    if (!seller && ads && ads.length) setSeller(ads[0].user)
  }, [ads])

  if (isLoading) return <h2>Загрузка...</h2>
  
  return (
    <Page>
      <PageTitle>Профиль продавца</PageTitle>
      <SellerProfileBlock seller={seller} />
      <SellerGoods ads={ads} />
    </Page>
  )
}
