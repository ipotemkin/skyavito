import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CrossIcon from '../../icons/Cross/CossIcon'
import { Page } from '../../pages/Page/Page'
import { Button } from '../Button/Button'
import { InputFileBar } from '../InputFileBar/InputFileBar'
import { Modal } from '../Modal/Modal'

import styles from './style.module.css'

// const adImages = [1, 2, 3, 4, 5]

type Props = {
  type?: 'new' | 'edit'
}

type AdModalForm = {
  [index: string]: string
  name: string
  desc: string
  price: string
}

const initialValue: AdModalForm = {
  name: '',
  desc: '',
  price: ''
}

export const AdModal: FC<Props> = ({ type = 'new' }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState<AdModalForm>(initialValue)

  let title = 'Редактировать объявление'
  let btnName = 'Сохранить'
  if (type === 'new') {
    title = 'Новое объявление'
    btnName = 'Опубликовать'
  }
  
  const handleClose = () => navigate(-1)    

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string
  ) => {
    setForm((prev: AdModalForm) => ({ ...prev, [field]: e.target.value }))
  }

  const checkFormValid = () => {
    for (const key in form)
      if (form[key].length === 0) return false 
    return true
  }

  return (
    <Modal isModalOpenArg={true}>
      <Page mode="modal">
        <div className={styles.modal__content}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.btnClose} onClick={handleClose}>
            <CrossIcon width={30} height={30}/>
          </div>
          <form className={styles.form} id="formNewArt" action="#">
            <div className={styles.formBlock}>
              <label htmlFor="name">Название</label>
              <input className={styles.input}
                type="text"
                placeholder="Введите название"
                value={form.name}
                onChange={(e) => handleFieldChange(e, 'name')}
                autoFocus
              />
            </div>
            <div className={styles.formBlock}>
              <label htmlFor="text">Описание</label>                            
              <textarea className={styles.area}
                rows={10}
                placeholder="Введите описание"
                value={form.desc}
                onChange={(e) => handleFieldChange(e, 'desc')}
              />
            </div>
            <div className={styles.formBlock}>
              <p className={styles.p}>Фотографии товара<span>не более 5 фотографий</span></p>
              <InputFileBar />
            </div>
            <div className={styles.formBlock}>
              <label htmlFor="price">Цена</label>
              <div className={styles.priceBlock}>
                <input className={styles.price}
                  type="text"
                  value={form.price}
                  onChange={(e) => handleFieldChange(e, 'price')}
                />
                <div className={styles.rouble}>₽</div>
              </div>
            </div>
            
            <Button size="l"  disabled={checkFormValid() ? false : true}>{btnName}</Button>
            
          </form>
        </div>
      </Page>
    </Modal>
  )
}
