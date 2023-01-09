import React from 'react'

import { Gallery } from '../../components/Gallery/Gallery'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { useAdsFiltered } from '../../hooks/adHooks'
import { useAppSelector } from '../../hooks/appHooks'
import { selectSearchValue } from '../../slices/searchSlice'
import { Page } from '../Page/Page'

export const Main = () => {
  const searchValue = useAppSelector(selectSearchValue)
  const { data } = useAdsFiltered(searchValue)

  return (
    <Page mobSearch>
      <PageTitle>Объявления</PageTitle>
      {data && <Gallery items={data} />}
    </Page>
  )
}
