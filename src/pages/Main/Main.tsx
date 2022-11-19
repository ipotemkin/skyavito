import React from 'react'

import { Gallery } from '../../components/Gallery/Gallery'
import { PageTitle } from '../../components/PageTitle/PageTitle'
import { goods } from '../../fixtures/goods'
import { Page } from '../Page/Page'

export const Main = () => {
  return (
    <Page mobSearch>
      <PageTitle>Объявления</PageTitle>
      <Gallery items={goods} />
    </Page>
  )
}
