import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { Header } from '../../components/Header/Header'
import TrianglesIcon from '../../icons/Triangles/TrianglesIcon'
import { ROUTES } from '../../routes'

// import styles from './style.module.css'

export const Profile = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Header />
      <div style={{ paddingTop: 122 }}></div>
      <div>
        <TrianglesIcon />
        <Button width={246} onClick={() => navigate(ROUTES.home)}>Вернуться на главную</Button>
      </div>
      <h2>Профиль</h2>
    </div>
  )
}
