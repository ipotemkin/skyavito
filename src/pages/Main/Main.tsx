import React from 'react'

import { Gallery } from '../../components/galleries/Gallery/Gallery'
import { PageTitle } from '../../components/ui/PageTitle/PageTitle'
import { useAdsFiltered } from '../../hooks/adHooks'
import { Page } from '../Page/Page'

export const Main = () => {
  const { data } = useAdsFiltered()

  return (
    <Page mobSearch>
      <PageTitle>Объявления</PageTitle>
      <Gallery items={data} />
    </Page>
  )
}
