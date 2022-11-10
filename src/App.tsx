import React from 'react'
import './App.css'
import { Button } from './components/Button/Button'

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Starting Diploma</p>
        <Button>Сохранить</Button>
        <Button disabled>Disabled</Button>
        <Button type="outlined">Outlined</Button>
        <Button type="secondary" size="m">Сохранить</Button>
      </header>
    </div>
  )
}
