import React from 'react'
import { goods } from '../../fixtures/goods'
import { Gallery } from '../Gallery/Gallery'
import { PageSubTitle } from '../PageSubTitle/PageSubTitle'

// import styles from './style.module.css'

export const SellerGoods = () => {
  return (
    <div>
      <PageSubTitle>Товары продавца</PageSubTitle>
      <Gallery items={goods} />
    </div>
  )
}
