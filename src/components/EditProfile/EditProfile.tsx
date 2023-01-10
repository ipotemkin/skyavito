import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useUpdateUserAvatarMutation, useUpdateUserMutation } from '../../api/products.api'
import { useAppDispatch } from '../../hooks/appHooks'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { ROUTES } from '../../routes'
import { deleteTokens } from '../../slices/tokenSlice'
import { UpdateUser } from '../../types'
import { isPhoneNumberValid } from '../../validators/phoneNumber'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'
import { PageSubTitle } from '../PageSubTitle/PageSubTitle'
import { FormInput } from './FormInput'

import styles from './style.module.css'

const initialState: UpdateUser = {
  name: '',
  surname: '',
  city: '',
  phone: '',
}

export const EditProfile = () => {
  const { data: user, isLoading, error } = useCurrentUser()
  const [formUser, setFormUser] = useState<UpdateUser>(initialState)
  const [updateUser] = useUpdateUserMutation()
  const [updateAvatar] = useUpdateUserAvatarMutation()
  const [changed, setChanged] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user) {
      const { name, surname, city, phone } = user
      setFormUser({ name, surname, city, phone })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setChanged(true)
    if (field === 'phone' && !isPhoneNumberValid(e.target.value)) return  
    setFormUser((prev: UpdateUser) => ({ ...prev, [field]: e.target.value }))
  }

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    const file = files && files[0]
    const reader = new FileReader()

    reader.onload = async () =>  {
      if (file) {
        try {
          const formData = new FormData()
          formData.append('file', file)
          await updateAvatar(formData).unwrap()
        } catch(error) {
          console.error(error)
        }
      }
    }

    reader.readAsDataURL(file as Blob);
  }

  const handleLogout = () => {
    setTimeout(() => dispatch(deleteTokens()), 100)
    navigate(ROUTES.home)
  }

  const handleChangePassword = () => {
    navigate(ROUTES.changePassword, { state: { background: location }})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await updateUser(formUser).unwrap()
      setChanged(false)
    } catch(error) {
      console.error(error)
    }
  }

  if (isLoading) return <h2>Загрузка...</h2>

  if (error) return <h2>Ошибка: {JSON.stringify(error)}</h2>

  
  return (
    <div className={styles.editProfile}>
      <PageSubTitle>Настройки профиля</PageSubTitle>
      <div className={styles.profile__settings}>
        
        <div className={styles.settings__left}>
          <Avatar image={user?.avatar}/>
          <label className={styles.inputAvatarLabel} htmlFor="input_avatar">
            Заменить
          </label>
          <input className={styles.inputAvatar} type="file"
            id="input_avatar"
            name="file"
            accept="image/*"
            onChange={handleChangeAvatar}
           />
        </div>

        <div className={styles.settings__right}>
          <form className={styles.settings__form} onSubmit={handleSubmit}>
            <FormInput label="Имя"
              placeholder="Имя"
              onChange={(e) => handleChange(e, 'name')}
              value={formUser.name || ''}
              autoFocus
            />
            <FormInput label="Фамилия"
              placeholder="Фамилия"
              onChange={(e) => handleChange(e, 'surname')}
              value={formUser.surname || ''}
              />
            <FormInput label="Город"
              placeholder="Город"
              onChange={(e) => handleChange(e, 'city')}
              value={formUser.city || ''}
              />
            <FormInput wide label="Телефон"
              placeholder="Телефон"
              onChange={(e) => handleChange(e, 'phone')}
              value={formUser.phone || ''}              
              />

            <div className={styles.settings__div} style={{ marginTop: 10 }}>
              <Button disabled={!changed} size="ml">Сохранить</Button>
            </div>
            <div className={styles.settings__div} style={{ marginTop: 10 }}>
              <Button onClick={handleChangePassword} size="ml">Сменить&nbsp;пароль</Button>
            </div>
            <div className={styles.settings__div} style={{ marginTop: 10 }}>
              <Button onClick={handleLogout} size="ml">Logout</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// function useGetCurrentUser(): { data: any; isLoading: any; error: any } {
//   throw new Error('Function not implemented.')
// }
