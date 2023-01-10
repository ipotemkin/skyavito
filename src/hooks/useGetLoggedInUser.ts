import { useGetUserQuery } from "../api/products.api"
import { selectAccessToken } from "../slices/tokenSlice"
import { useAppSelector } from "./appHooks"

export const useCurrentUser = () => {
  const token = useAppSelector(selectAccessToken)  
  const { data: user, isLoading, isError, error } = useGetUserQuery(0, { refetchOnMountOrArgChange: true })
  if (!token) return { data: undefined, isLoading, isError, error }

  return { data: user, isLoading, isError, error }
}