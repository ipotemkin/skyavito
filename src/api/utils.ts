import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"

type ErrorData = {
  detail: string
}

export const getError = (error: FetchBaseQueryError) => (error.data as ErrorData).detail
