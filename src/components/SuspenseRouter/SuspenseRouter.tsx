import { BrowserHistory, createBrowserHistory, Update } from 'history'
import React, { FC,
  // useEffect,
  useLayoutEffect, useRef, useState, useTransition
} from 'react'
import { Router } from 'react-router-dom'

import { getPath } from './utils'

type Props = {
  basename?: string
  children?: React.ReactNode
  // window?: Window
}

// храним страницы, для которых уже загружен код
const loadedPages: string[] = []

// не переключает на новую страницу, пока она не готова
export const SuspenseRouter: FC<Props> = ({ basename, children }) => {
  const historyRef = useRef<BrowserHistory | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition()

  if (historyRef.current === null) {
    historyRef.current = createBrowserHistory({ window })
    if (loadedPages.length === 0) {
      const newLoc = getPath(historyRef.current.location.pathname)  
      if (newLoc) loadedPages.push(newLoc)
    }
  }

  const history = historyRef.current
  const { action, location } = history
  const [state, setState] = useState({ action, location })

  const setStateAsync = (update: Update) => {
    const newLoc = getPath(update.location.pathname)
    
    // если код страницы еще не загружен, добавляем её в список и показываем спиннер
    if (newLoc && !loadedPages.includes(newLoc)) loadedPages.push(newLoc)
    startTransition(() => setState(update))
  }

  useLayoutEffect(() => history.listen(setStateAsync), [history])

  // useEffect(() => {
  //   if (!isPending) dispatch(hideSpinner())
  // }, [dispatch, isPending])

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  )
}
