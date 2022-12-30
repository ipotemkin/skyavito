import { useEffect, useState } from "react"
import { useGetProductsQuery } from "../api/products.api"
import { CardType } from "../types"

export const useAdsFiltered = (filter = '') => {
  const { data, isLoading, error } = useGetProductsQuery()
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
