import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAddImageToAdMutation, useDeleteAdImageMutation, useGetAdQuery, useUpdateAdMutation } from '../../api/products.api'
import CrossIcon from '../../icons/Cross/CossIcon'
import { Page } from '../../pages/Page/Page'
import { DeleteAdImageArgs, Image, UpdateAd, UpdateAdArgs, UpdateAdForm } from '../../types'
import { getImageLst } from '../../utils'
import { validatePrice } from '../../validators/validators'
import { Button } from '../Button/Button'
import { InputFileBar } from '../InputFileBar/InputFileBar'
import { Modal } from '../Modal/Modal'
import { difference, getImagesToSave, getUrlsFromImages } from './utils'

import styles from './style.module.css'
import { ModalTitle } from '../ModalTitle/ModalTitle'

const initialValue: UpdateAdForm = {
  title: '',
  price: 0,
  description: '',
}

export const UpdateAdModal = () => {
  const adId = Number(useParams().id)
  const { data: ad } = useGetAdQuery(adId)

  const [isBlocked, setIsBlocked] = useState(true)

  const navigate = useNavigate()
  const [form, setForm] = useState<UpdateAdForm>(initialValue)
  
  const [updateAd] = useUpdateAdMutation()
  const [addImageToAd] = useAddImageToAdMutation()
  const [deleteAdImage] = useDeleteAdImageMutation()
  
  const [imageFiles, setImageFiles] = useState<Image[]>(getImageLst(5))

  const title = 'Редактировать'
  const btnName = 'Сохранить'
  
  useEffect(() => {
    if (isImagesChanged()) setIsBlocked(false)
  }, [imageFiles])
  
  useEffect(() => {
    if (ad) {
      setForm({
        title: ad.title,
        price: ad.price,
        description: ad.description,
        images: ad.images
      })
    }
  }, [ad])

  // прверяем изменились ли картинки
  const isImagesChanged = () => {
    const imageUrlsToDelete = getImageUrlsToDelete()
    if (imageUrlsToDelete.length) return true

    const imagesToSave = getImagesToSave(imageFiles)
    if (imagesToSave.length) return true

    return false
  }

  const checkFormValid = () => {
    // добавить необходимую валидацию
    // if (form.title.length === 0 || form.price.length === 0) return false
    return true
  }

  const getImageUrlsToDelete = () => {
    let imageUrlsToDelete: string[] = []
    if (form.images) {
      const oldImageUrls = getUrlsFromImages(form.images)
      const newImageUrls = getUrlsFromImages(imageFiles)
      imageUrlsToDelete = difference(oldImageUrls, newImageUrls)
    }
    return imageUrlsToDelete
  }
    
  const handleClose = () => navigate(-1)    

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string,
  ) => {
    setIsBlocked(false)
    if (field === 'price') e.target.value = validatePrice(e.target.value)
    setForm((prev: UpdateAdForm) => ({ ...prev, [field]: e.target.value }))
  }

  const handleInputFileBarClick = () => {
    if (isImagesChanged()) setIsBlocked(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsBlocked(true)

    const body: UpdateAd = {
      title: form.title,
      description: form.description,
      price: Number(form.price)
    }

    const payload: UpdateAdArgs = {
      id: adId,
      body,
    }

    try {
      // обновляем текствую информацию объявления
      await updateAd(payload).unwrap()

      // сохраняем новые картинки
      const imagesToSave = getImagesToSave(imageFiles)
      imagesToSave.forEach(async (imageFile) => {
        try {
          if (imageFile.file) {
            const formData = new FormData()
            formData.append('file', imageFile.file)
            await addImageToAd({ idx: adId, body: formData }).unwrap()
          }
        } catch (error) {
          console.error(error)
        }
      })

      // удаляем удаленные картинки
      const imageUrlsToDelete = getImageUrlsToDelete()
      if (imageUrlsToDelete.length) {
        imageUrlsToDelete.forEach(async (imageUrl: string) => {
          try {
            const deleteAdImageArgs: DeleteAdImageArgs = {
              idx: adId,
              fileUrl: imageUrl,
            }
            await deleteAdImage(deleteAdImageArgs).unwrap()
          } catch (error) {
            console.error(error)
          }
        })
      }     
    } catch (error) {
      console.error(error)
    }

    setIsBlocked(false)
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
                value={form.title || ''}
                onChange={(e) => handleFieldChange(e, 'title')}
                autoFocus
              />
            </div>
            <div className={styles.formBlock}>
              <label htmlFor="text">Описание</label>                            
              <textarea className={styles.area}
                rows={10}
                placeholder="Введите описание"
                value={form.description || ''}
                onChange={(e) => handleFieldChange(e, 'description')}
              />
            </div>
            <div className={styles.formBlock}>
              <p className={styles.p}>Фотографии товара<span>не более 5 фотографий</span></p>
              <InputFileBar
                setImageFiles={setImageFiles}
                images={form.images}
                onClick={handleInputFileBarClick}
              />
            </div>
            <div className={styles.formBlock}>
              <label htmlFor="price">Цена</label>
              <div className={styles.priceBlock}>
                <input className={styles.price}
                  type="text"
                  value={form.price || ''}
                  onChange={(e) => handleFieldChange(e, 'price')}
                />
                <div className={styles.rouble}>₽</div>
              </div>
            </div>
            
            <Button size="l"  disabled={checkFormValid() && !isBlocked ? false : true}>{btnName}</Button>
            
          </form>
        </div>
      </Page>
    </Modal>
  )
}
