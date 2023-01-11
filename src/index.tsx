import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
// import reportWebVitals from './reportWebVitals'

import { App } from './App'
import { ScrollToTop } from './components/utils/ScrollToTop/ScrollToTop'
import { SuspenseRouter } from './components/utils/SuspenseRouter/SuspenseRouter'
import { store } from './store'

import './index.css'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <SuspenseRouter>
        <ScrollToTop />
        <App />
      </SuspenseRouter>
    </Provider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
