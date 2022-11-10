import React from 'react'

import styles from './style.module.css'
import { Button } from '../Button/Button'
import { FormInput } from './FormInput'

export const EditProfile = () => {
  return (
    <div className={styles.profile__settings}>
      <div className={styles.settings__right}>
        <form className={styles.settings__form} action="#">
            <FormInput label="Имя" placeholder="Имя" />
            <FormInput label="Фамилия" placeholder="Фамилия"/>
            <FormInput label="Город" placeholder="Город" />
            <FormInput label="Телефон" placeholder="Телефон" width={574}/>

            <div className={styles.settings__div} style={{ marginTop: 10 }}>
              <Button>Сохранить</Button>
            </div>
        </form>
      </div>
    </div>
  )
}
