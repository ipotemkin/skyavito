import Cookies from 'js-cookie'

import { setTokens } from '../slices/tokenSlice'
import { useAppDispatch } from './appHooks'

// возвращает функцию для загрузки credentials из cookies
export const useLoadCredentialsFromCookies = () => {
  const dispatch = useAppDispatch()

  const loadCredentials = () => {
    const access_token = Cookies.get('access_token')
    const refresh_token = Cookies.get('refresh_token')

    if (access_token && refresh_token) {
      dispatch(setTokens({ access_token, refresh_token }))
    }
  }

  return { loadCredentials }
}
