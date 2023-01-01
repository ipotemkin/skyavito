import React, { useEffect, useState } from 'react'
import { useGetUserQuery, useUpdateUserMutation } from '../../api/products.api'
import { UpdateUser, User } from '../../types'

import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'
import { PageSubTitle } from '../PageSubTitle/PageSubTitle'
import { FormInput } from './FormInput'

import styles from './style.module.css'

const initialState: UpdateUser = {
  name: '',
  surname: '',
  city: '',
  phone: ''
}

export const EditProfile = () => {
  // const [name, setName] = useState('')
  const { data: user } = useGetUserQuery(0, { refetchOnMountOrArgChange: true })
  const [formUser, setFormUser] = useState<UpdateUser>(initialState)
  const [updateUser] = useUpdateUserMutation()

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('before preventDefault')
    console.log(e)
    e.preventDefault()
    try {
      console.log('before updateUser')
      const resp = await updateUser(formUser).unwrap()
      console.log('resp -->', resp)
    } catch(error) {
      console.log(error)
    } 
  }

  return (
    <div className={styles.editProfile}>
      <PageSubTitle>Настройки профиля</PageSubTitle>
      {/* <h3 className={styles.profile__title}>Настройки профиля</h3> */}
      <div className={styles.profile__settings}>
        
        <div className={styles.settings__left}>
          <Avatar image={user?.avatar}/>
          <a className={styles['settings__change-photo']} href="" target="_self">
            Заменить
          </a>
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
