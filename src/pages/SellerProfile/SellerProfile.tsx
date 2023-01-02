import { skipToken } from '@reduxjs/toolkit/dist/query'
import React from 'react'
import { useParams } from 'react-router-dom'

import { useGetAdsByUserIdaAndPageQuery, useGetAdsByUserIdQuery } from '../../api/products.api'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { SellerGoods } from '../../components/SellerGoods/SellerGoods'
import { SellerProfileBlock } from '../../components/SellerProfileBlock/SellerProfileBlock'
import { useAdsFiltered } from '../../hooks/adHooks'
import { useAppSelector } from '../../hooks/appHooks'
import { selectSearchValue } from '../../slices/searchSlice'
import { Page } from '../Page/Page'

// import styles from './style.module.css'

export const SellerProfile = () => {
  const searchValue = useAppSelector(selectSearchValue)

  const { id } = useParams()
  const sellerId = Number(id)
  
  // добавить ручку для получения данных о пользовпателе по id
  // получаем первую страницу объявлений пользователя, чтобы получить данные о самом польлзователе
  const { data: tempAds } = useGetAdsByUserIdaAndPageQuery({ id: sellerId ?? skipToken, page: 1 })
  const seller = tempAds && tempAds.length ? tempAds[0].user : undefined
  
  const { data: ads, isLoading } = useAdsFiltered(searchValue, useGetAdsByUserIdQuery, sellerId ?? skipToken)

  if (isLoading) return <h2>Загрузка...</h2>
  // if (seller === undefined) return <h2>Загрузка (seller)...</h2>
  
  return (
    <Page>
      <PageTitle>Профиль продавца</PageTitle>
      <SellerProfileBlock seller={seller} />
      <SellerGoods ads={ads} />
    </Page>
  )
}
