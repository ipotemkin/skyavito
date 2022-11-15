import React, { useState } from 'react'

import styles from './style.module.css'
import { Button } from '../Button/Button'
import { FormInput } from './FormInput'
import { Avatar } from '../Avatar/Avatar'
import { PageSubTitle } from '../PageSubTitle/PageSubTitle'

export const EditProfile = () => {
  const [name, setName] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  return (
    <div className={styles.editProfile}>
      <PageSubTitle>Настройки профиля</PageSubTitle>
      {/* <h3 className={styles.profile__title}>Настройки профиля</h3> */}
      <div className={styles.profile__settings}>
        
        <div className={styles.settings__left}>
          <Avatar />
          <a className={styles['settings__change-photo']} href="" target="_self">
            Заменить
          </a>
        </div>

        <div className={styles.settings__right}>
          <form className={styles.settings__form} action="#">
            <FormInput label="Имя" placeholder="Имя" onChange={handleChange} value={name} autoFocus/>
            <FormInput label="Фамилия" placeholder="Фамилия"/>
            <FormInput label="Город" placeholder="Город" />
            <FormInput label="Телефон" placeholder="Телефон" wide />

            <div className={styles.settings__div} style={{ marginTop: 10 }}>
              <Button>Сохранить</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
