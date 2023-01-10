import React from 'react'

import { Gallery } from '../../components/Gallery/Gallery'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { useAdsFiltered } from '../../hooks/adHooks'
import { Page } from '../Page/Page'

export const Main = () => {
  const { data } = useAdsFiltered()

  return (
    <Page mobSearch>
      <PageTitle>Объявления</PageTitle>
      {data && <Gallery items={data} />}
    </Page>
  )
}
