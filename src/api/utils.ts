import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"

type ErrorData = {
  detail: string
}

export const getErrorMessage = (error: FetchBaseQueryError) => {
  if (!('data' in error))
    return 'Что-то пошло не так...'
  
  const errorFromApi = (error.data as ErrorData).detail
  if (errorFromApi in ERRORS)
    return ERRORS[errorFromApi]
  return errorFromApi
}

type ERRORSTypes = {
  [index: string]: string
}

const ERRORS: ERRORSTypes = {
  'Incorrect email': 'Неверный email',
  'Incorrect password': 'Неверный пароль'
}
