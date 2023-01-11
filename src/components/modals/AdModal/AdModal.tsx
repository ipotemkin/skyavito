import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAddImageToAdMutation, useCreateAdTextMutation } from '../../../api/products.api'
import { Button } from '../../../components/ui/Button/Button'
import { InputFileBar } from '../../../components/ui/InputFileBar/InputFileBar'
import { ModalTitle } from '../../../components/ui/ModalTitle/ModalTitle'
import CrossIcon from '../../../icons/Cross/CossIcon'
import { Page } from '../../../pages/Page/Page'
import { CreateAd, CreateAdForm, Image } from '../../../types'
import { getImageLst } from '../../../utils'
import { validatePrice } from '../../../validators/validators'
import { Modal } from '../../layout/Modal/Modal'

import styles from './style.module.css'

type Props = {
  type?: 'new' | 'edit'
}

const initialValue: CreateAdForm = {
  title: '',
  price: '',
  description: '',
}

export const AdModal: FC<Props> = ({ type = 'new' }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState<CreateAdForm>(initialValue)
  const [createAdText] = useCreateAdTextMutation()
  const [addImageToAd] = useAddImageToAdMutation()
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
    field: string,
  ) => {
    if (field === 'price') e.target.value = validatePrice(e.target.value)
    setForm((prev: CreateAdForm) => ({ ...prev, [field]: e.target.value }))
  }

  const checkFormValid = () => {
    if (form.title.length === 0 || form.price.length === 0) return false
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

    try {
      const resp = await createAdText(newAd).unwrap()
      imageFiles.forEach(async (imageFile) => {
        try {
          if (imageFile.file && resp.id) {
            const formData = new FormData()
            formData.append('file', imageFile.file)
            await addImageToAd({ idx: resp.id, body: formData }).unwrap()
          }
        } catch (error) {
          console.error(error)
        }
      })

    } catch (error) {
      console.error(error)
    }

    // TODO: сделать закрытие, чтобы модалка не оставалась в истории
    handleClose()
  }

  return (
    <Modal isModalOpenArg={true}>
      <Page mode="modal">
        <div className={styles.modal__content}>
          <ModalTitle>{title}</ModalTitle>
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
