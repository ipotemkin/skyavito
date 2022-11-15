import React from 'react'

import { PageTitle } from '../../components/PageTitle/PageTitle'
import { SellerGoods } from '../../components/SellerGoods/SellerGoods'
import { SellerProfileBlock } from '../../components/SellerProfileBlock/SellerProfileBlock'
import { Page } from '../Page/Page'

// import styles from './style.module.css'

export const SellerProfile = () => {
  return (
    <Page>
      <PageTitle>Профиль продавца</PageTitle>
      <SellerProfileBlock />
      <SellerGoods />
    </Page>
  )
}
