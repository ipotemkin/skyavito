import React from 'react'

// import { useGetProductsQuery } from '../../api/products.api'
import { Gallery } from '../../components/Gallery/Gallery'
import { PageTitle } from '../../components/PageTitle/PageTitle'
// import { goods } from '../../fixtures/goods'
import { useAdsFiltered } from '../../hooks/adHooks'
import { useAppSelector } from '../../hooks/appHooks'
import { selectSearchValue } from '../../slices/searchSlice'
import { Page } from '../Page/Page'

export const Main = () => {
  // const { data, isLoading, error } = useGetProductsQuery()
  const searchValue = useAppSelector(selectSearchValue)
  const { data } = useAdsFiltered(searchValue)

  return (
    <Page mobSearch>
      <PageTitle>Объявления</PageTitle>
      {/* <Gallery items={goods} /> */}
      {data && <Gallery items={data} />}
    </Page>
  )
}
