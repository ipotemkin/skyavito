import { BaseQueryApi, FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"
import { RefreshTokensRequest } from "../types"
import { authApi } from "./auth.api"

type ErrorData = {
  detail?: string
  details?: string
}

export const getErrorMessage = (error: FetchBaseQueryError) => {
  
  if (!('data' in error))
    return 'Что-то пошло не так...'
  
  const errData = error.data as ErrorData
  const errorFromApi = errData.detail || errData.details || ''
  if (errorFromApi in ERRORS)
    return ERRORS[errorFromApi]

  if (errorFromApi.includes('UNIQUE constraint failed'))
    return 'Email занят'

  return errorFromApi
}

type ERRORSTypes = {
  [index: string]: string
}

const ERRORS: ERRORSTypes = {
  'Incorrect email': 'Неверный email',
  'Incorrect password': 'Неверный пароль',
  // 'UNIQUE constraint failed': 'Email занят'
}

export const refreshTokens = async (api: BaseQueryApi, payload: RefreshTokensRequest) => {
  return await api.dispatch(authApi.endpoints.refreshTokens.initiate(payload))
}
