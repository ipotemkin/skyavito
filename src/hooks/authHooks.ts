import Cookies from 'js-cookie'

import { setTokens } from '../slices/tokenSlice'
import { useAppDispatch } from './appHooks'

// возвращает функцию для загрузки credentials из cookies
export const useLoadCredentialsFromCookies = () => {
  const dispatch = useAppDispatch()

  const loadCredentials = () => {
    console.log('loading credentials')
    const access_token = Cookies.get('access_token')
    const refresh_token = Cookies.get('refresh_token')
    console.log('access_token -->', access_token)
    console.log('refresh_token -->', refresh_token)

    if (access_token && refresh_token) {
      console.log('dispathcing tokens to the store')
      dispatch(setTokens({ access_token, refresh_token }))
    }
  }

  return { loadCredentials }
}
