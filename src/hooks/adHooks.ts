import { useEffect, useState } from "react"

import { useGetAdsQuery } from "../api/products.api"
import { selectSearchValue } from "../slices/searchSlice"
import { CardType } from "../types"
import { useAppSelector } from "./appHooks"

export const useAdsFiltered = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryHook: any = useGetAdsQuery, rest: any[] = []
  ) => {
  const searchValue = useAppSelector(selectSearchValue)
  const { data, isLoading, error } = queryHook(...rest)
  const [filteredData, setFilteredData] = useState<CardType[]>([])

  useEffect(() => {
    if (data) {
      const newData = data.filter((item: CardType) => 
        item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      )
      setFilteredData(newData)
    }
  }, [data, searchValue])

  return { data: filteredData || data, isLoading, error }
}
