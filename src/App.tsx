import React from 'react'
import './App.css'
import { Button } from './components/Button/Button'
import CrossIcon from './icons/Cross/CossIcon'
import HeartIcon from './icons/Heart/HeartIcon'

export const App = () => {
  return (
    <div className="App">
      <header className="App-header" style={{ gap: 16 }}>
        <p>Starting Diploma</p>
        <Button >Сохранить</Button>
        <Button disabled>Disabled</Button>
        <Button type="outlined">Outlined</Button>
        <Button type="secondary" size="m">Сохранить</Button>
        <HeartIcon />
        <div style={{ width: 200, height: 100, backgroundColor: "#009EE4" }}>
          <HeartIcon type="secondary"/>
        </div>
        <CrossIcon />
      </header>
    </div>
  )
}
