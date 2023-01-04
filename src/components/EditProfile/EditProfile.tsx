import React, { useEffect, useState } from 'react'

import { useGetUserQuery, useUpdateUserAvatarMutation, useUpdateUserMutation } from '../../api/products.api'
import { UpdateUser } from '../../types'
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
  // const [name, setName] = useState('')
  const { data: user, isLoading, error } = useGetUserQuery(0, { refetchOnMountOrArgChange: true })
  const [formUser, setFormUser] = useState<UpdateUser>(initialState)
  const [updateUser] = useUpdateUserMutation()
  const [updateAvatar] = useUpdateUserAvatarMutation()

  // useEffect(() => {
  //   refetch()
  // }, [])

  useEffect(() => {
    if (user) {
      const { name, surname, city, phone } = user
      setFormUser({
        name,
        surname,
        city,
        phone
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    // setName(e.target.value)
    setFormUser((prev: UpdateUser) => ({...prev, [field]: e.target.value}))
  }

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    // const fileName = files && files[0].name ? files[0].name : ''
    const file = files && files[0]
    // console.log(fileName)
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // console.log('before preventDefault')
    // console.log(e)
    e.preventDefault()
    try {
      // console.log('before updateUser')
      const resp = await updateUser(formUser).unwrap()
      // console.log('resp -->', resp)
    } catch(error) {
      console.log(error)
    } 
  }

  if (isLoading) return <h2>Загрузка...</h2>

  if (error) return <h2>Ошибка: {JSON.stringify(error)}</h2>

  
  return (
    <div className={styles.editProfile}>
      <PageSubTitle>Настройки профиля</PageSubTitle>
      {/* <h3 className={styles.profile__title}>Настройки профиля</h3> */}
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
              <Button>Сохранить</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
