import React from 'react'

import { Gallery } from '../../components/Gallery/Gallery'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { useAdsFiltered } from '../../hooks/adHooks'
import { Page } from '../Page/Page'

export const Main = () => {
  const { data, isLoading } = useAdsFiltered()

  return (
    <Page mobSearch>
      <PageTitle>Объявления</PageTitle>
      {data.length > 0 && <Gallery items={data} />}
      {!data.length && !isLoading && <h2>По данному запросу ничего не найдено</h2>}
    </Page>
  )
}
