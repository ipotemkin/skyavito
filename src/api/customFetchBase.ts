import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

import { API_URL } from '../constants'
import { setNeedRelogin } from '../slices/reloginSlice'
import { RootState } from '../store'
import { refreshTokens } from './utils'

// Create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).token.access_token;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
})

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  
  const { access_token, refresh_token } = (api.getState() as RootState).token

  let result = await baseQuery(args, api, extraOptions)

  if ([401].includes(result.error?.status as number)) {
    
    if (access_token && refresh_token) {

      if (!mutex.isLocked()) {
        const release = await mutex.acquire()

        try {
          await refreshTokens(api, { access_token, refresh_token })
          result = await baseQuery(args, api, extraOptions)
        } catch (error) {
          console.error(error)
          api.dispatch(setNeedRelogin(true))
        } finally {
          release()
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock()
        result = await baseQuery(args, api, extraOptions)
      }
    } else {
      console.error('No tokens')
      api.dispatch(setNeedRelogin(true))
    }
  }

  return result
}

export default customFetchBase
