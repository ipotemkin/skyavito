import { skipToken } from "@reduxjs/toolkit/dist/query"
import { useEffect, useState } from "react"
import { useGetAdsByUserIdQuery, useGetProductsQuery } from "../api/products.api"
import { CardType } from "../types"

// export const useAdsFiltered = (filter = '') => {
//   const { data, isLoading, error } = useGetProductsQuery()
//   const [filteredData, setFilteredData] = useState<CardType[]>([])

//   useEffect(() => {
//     if (data) {
//       const newData = data.filter((item: CardType) => 
//         item.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
//       )
//       setFilteredData(newData)
//     }
//   }, [data, filter])

//   return { data: filteredData || data, isLoading, error }
// }

export const useAdsFiltered = (
  filter = '', queryHook: any = useGetProductsQuery, id?: number
  ) => {
  const { data, isLoading, error } = queryHook(id)
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
