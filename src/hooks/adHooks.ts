import { useEffect, useState } from "react"

import { useGetAdsQuery } from "../api/products.api"
import { CardType } from "../types"

export const useAdsFiltered = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter = '', queryHook: any = useGetAdsQuery, rest: any[] = []
  ) => {
  const { data, isLoading, error } = queryHook(...rest)
  const [filteredData, setFilteredData] = useState<CardType[]>([])

  useEffect(() => {
    if (data) {
      const newData = data.filter((item: CardType) => 
        item.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      )
      setFilteredData(newData)
    }
  }, [data, filter])

  return { data: filteredData || data, isLoading, error }
}
