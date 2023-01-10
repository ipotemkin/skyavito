import React, { useEffect } from 'react'

import { useLoadCredentialsFromCookies } from './hooks/authHooks'
import { AppRoutes } from './routes'

import './App.css'

export const App = () => {
  const { loadCredentials } = useLoadCredentialsFromCookies()

  useEffect(() => {
    loadCredentials()
  }, [])

  return <AppRoutes />
}
