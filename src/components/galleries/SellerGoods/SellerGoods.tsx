import React from 'react'

import { CardType } from '../../../types'
import { Gallery } from '../Gallery/Gallery'
import { PageSubTitle } from '../../../components/ui/PageSubTitle/PageSubTitle'

type Props = {
  ads?: CardType[]
}

export const SellerGoods = ({ ads }: Props) => {
  if (!ads) return <h2>Ошибка загрузки объявлений</h2>

  return (
    <div>
      <PageSubTitle>Товары продавца</PageSubTitle>
      <Gallery items={ads} />
    </div>
  )
}
