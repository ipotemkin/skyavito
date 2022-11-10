import React from 'react'
import './App.css'
import { Button } from './components/Button/Button'
import { Header } from './components/Header/Header'
import CrossIcon from './icons/Cross/CossIcon'
import HeartIcon from './icons/Heart/HeartIcon'
import LogoIcon from './icons/Logo/LogoIcon'
import TrianglesIcon from './icons/Triangles/TrianglesIcon'
import { Main } from './pages/Main/Main'

export const App = () => {
  return (
    <div className="App">
      {/* <header className="App-header" style={{ gap: 16 }}>
        <Header />
        <p>Starting Diploma</p>
        <LogoIcon />
        <Button >Сохранить</Button>
        <Button disabled>Disabled</Button>
        <Button type="outlined">Outlined</Button>
        <HeartIcon />
        <div style={{ width: 160, height: 80, padding: 12, gap: 16, backgroundColor: "#009EE4" }}>
          <HeartIcon type="secondary"/>
          <Button type="secondary" size="m">Сохранить</Button>
        </div>
        <CrossIcon />
        <TrianglesIcon />
      </header> */}
      <Main />
    </div>
  )
}
