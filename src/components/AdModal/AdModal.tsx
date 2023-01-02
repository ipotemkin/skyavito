import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdImageToAdMutation, useCreateAdMutation, useCreateAdTextMutation } from '../../api/products.api'

import CrossIcon from '../../icons/Cross/CossIcon'
import { Page } from '../../pages/Page/Page'
import { CreateAd, CreateAdArgs, CreateAdForm, Image } from '../../types'
import { Button } from '../Button/Button'
import { InputFileBar } from '../InputFileBar/InputFileBar'
import { Modal } from '../Modal/Modal'

import styles from './style.module.css'

// const adImages = [1, 2, 3, 4, 5]

type Props = {
  type?: 'new' | 'edit'
}

// type AdModalForm = {
//   [index: string]: string
//   name: string
//   desc: string
//   price: string
// }

// const initialValue: AdModalForm = {
//   name: '',
//   desc: '',
//   price: ''
// }

const initialValue: CreateAdForm = {
  title: '',
  price: '',
  description: '',
}

const getImageLst = (count = 5): Image[] => {
  const res = []
  for (let i = 0; i < count; i++) res.push({ id: i, url: '', file: null })
  return res
}

export const AdModal: FC<Props> = ({ type = 'new' }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState<CreateAdForm>(initialValue)
  const [createAdText] = useCreateAdTextMutation()
  const [adImageToAd] = useAdImageToAdMutation()
  const [imageFiles, setImageFiles] = useState<Image[]>(getImageLst(5))

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
    setForm((prev: CreateAdForm) => ({ ...prev, [field]: e.target.value }))
  }

  const checkFormValid = () => {
    if (form.title.length === 0 || form.price.length === 0) return false

    // for (const key in form)
    //   if (form[key].length === 0) return false 
    return true
  }

// TODO: переделать на создание объявления сразу с несколькими фотографиями
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newAd: CreateAd = {
      title: form.title,
      description: form.description,
      price: Number(form.price)
    }

    // const formData = new FormData()
    // formData.append('file', file)
    // const params = authHeaders(token)

    // let files: string|Blob[] = []
    

    // const lst: File[] = []

    // imageFiles.forEach((imageFile) => {
    //   if (imageFile.file) {
    //     lst.push(imageFile.file)
    //   }   
    // })

    // const formData = new FormData()
    // formData.append('title', form.title)
    // formData.append('description', form.description)
    // formData.append('price', form.price)
    // formData.append('files', lst)

    
    // Object.keys(newAd).forEach((key) => formData.append(key, newAd[key]));

    
    try {
      const resp = await createAdText(newAd).unwrap()
      console.log('resp -->', resp)

      imageFiles.forEach(async (imageFile) => {
        try {
          if (imageFile.file && resp.id) {
            const formData = new FormData()
            formData.append('file', imageFile.file)
            await adImageToAd({ idx: resp.id, body: formData }).unwrap()  
          }
        } catch (error) {
          console.log('error -->', error)
        }
      })

    } catch (error) {
      console.log('error -->', error)
    }

    handleClose()
  }

  return (
    <Modal isModalOpenArg={true}>
      <Page mode="modal">
        <div className={styles.modal__content}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.btnClose} onClick={handleClose}>
            <CrossIcon width={30} height={30}/>
          </div>
          <form className={styles.form} id="formNewArt" onSubmit={handleSubmit}>
            <div className={styles.formBlock}>
              <label htmlFor="name">Название</label>
              <input className={styles.input}
                type="text"
                placeholder="Введите название"
                value={form.title}
                onChange={(e) => handleFieldChange(e, 'title')}
                autoFocus
              />
            </div>
            <div className={styles.formBlock}>
              <label htmlFor="text">Описание</label>                            
              <textarea className={styles.area}
                rows={10}
                placeholder="Введите описание"
                value={form.description}
                onChange={(e) => handleFieldChange(e, 'description')}
              />
            </div>
            <div className={styles.formBlock}>
              <p className={styles.p}>Фотографии товара<span>не более 5 фотографий</span></p>
              <InputFileBar setImageFiles={setImageFiles}/>
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
