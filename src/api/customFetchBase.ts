import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

import { API_URL } from '../constants'
import { setNeedRelogin } from '../slices/reloginSlice'
// import { hideSpinnerForce, showFetchSpinner, showSpinnerForce } from '../slices/spinnerSlice'
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
  // alert('in customFetchBase')
  // api.dispatch(showFetchSpinner())

  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  
  const { access_token, refresh_token } = (api.getState() as RootState).token

  let result = await baseQuery(args, api, extraOptions)

  if ([401].includes(result.error?.status as number)) {
    // api.dispatch(showSpinnerForce())
    
    if (access_token && refresh_token) {

      if (!mutex.isLocked()) {
        // console.log('mutex.acquire')
        const release = await mutex.acquire()

        // console.log('refreshing tokens')
        try {
          const resp = await refreshTokens(api, { access_token, refresh_token })

          // alert(JSON.stringify(resp))
      
          // Retry the initial query
          // console.log('retrying the initial query')
          result = await baseQuery(args, api, extraOptions)

        } catch (error) {
          console.error(error)
          api.dispatch(setNeedRelogin(true))
          // alert(JSON.stringify(error))
        } finally {
          // if (!success) api.dispatch(updateCurrentUser({ needRelogin: true }))
          // release must be called once the mutex should be released again.
          // console.log('release mutex')
          release()
        }
      } else {
        // wait until the mutex is available without locking it
        // console.log('mutex.waitForUnlock')
        // console.log('args -->', args)        
        await mutex.waitForUnlock()
        result = await baseQuery(args, api, extraOptions)
      }
    } else {
      console.error('No tokens')
      api.dispatch(setNeedRelogin(true))
    }
  }

  // делаем задержку в полсекунды, чтобы спиннер не моргал,
  // если несколько запросов идут друг за другом
  // setTimeout(() => api.dispatch(hideSpinnerForce()), 500)
  return result
}

export default customFetchBase
