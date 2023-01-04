import { skipToken } from '@reduxjs/toolkit/dist/query'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAdImageToAdMutation, useUpdateAdMutation, useGetProductQuery, useDeleteAdImageMutation } from '../../api/products.api'
import CrossIcon from '../../icons/Cross/CossIcon'
import { Page } from '../../pages/Page/Page'
import { CreateAd, CreateAdForm, DeleteAdImageArgs, Image, UpdateAd, UpdateAdArgs, UpdateAdForm } from '../../types'
import { getImageLst } from '../../utils'
import { Button } from '../Button/Button'
import { InputFileBar } from '../InputFileBar/InputFileBar'
import { Modal } from '../Modal/Modal'

import styles from './style.module.css'

const difference = (lst1: string[], lst2: string[]): string[] => {
  const set2 = new Set(lst2)
  return lst1.filter(x => !set2.has(x))
}

const getUrlsFromImages = (data: Image[]): string[] => {
  const res: string[] = []
  data.forEach((image: Image) => {
    if (!image.url.startsWith('data:')) res.push(image.url)
  })
  return res
}

const getImagesToSave = (data: Image[]): Image[] => 
  data.filter((image: Image) => image.url.startsWith('data:'))

const initialValue: UpdateAdForm = {
  title: '',
  price: 0,
  description: '',
}

export const UpdateAdModal = () => {
  const adId = Number(useParams().id)
  const { data: ad } = useGetProductQuery(adId)

  const [isBlocked, setIsBlocked] = useState(false)

  const navigate = useNavigate()
  const [form, setForm] = useState<UpdateAdForm>(initialValue)
  
  const [updateAd] = useUpdateAdMutation()
  const [adImageToAd] = useAdImageToAdMutation()
  const [deleteAdImage] = useDeleteAdImageMutation()
  
  const [imageFiles, setImageFiles] = useState<Image[]>(getImageLst(5))

  const title = 'Редактировать объявление'
  const btnName = 'Сохранить'
  
  useEffect(() => {
    if (ad) {
      console.log('ad -->', ad)
      setForm({
        title: ad.title,
        price: ad.price,
        description: ad.description,
        images: ad.images
      })
    }
  }, [ad])
  
  const handleClose = () => navigate(-1)    

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string,
  ) => {
    setForm((prev: UpdateAdForm) => ({ ...prev, [field]: e.target.value }))
  }

  const checkFormValid = () => {
    // if (form.title.length === 0 || form.price.length === 0) return false
    return true
  }

// TODO: переделать на создание объявления сразу с несколькими фотографиями
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsBlocked(true)

    // =======================
    // analyzing image urls
    // =======================

    console.group('UpdateAdModal:handleSubmit:')
    console.log('form.images -->', form.iamges)

    let imageUrlsToDelete: string[] = []
    if (form.images) {
      const oldImageUrls = getUrlsFromImages(form.images)
      const newImageUrls = getUrlsFromImages(imageFiles)
      imageUrlsToDelete = difference(oldImageUrls, newImageUrls)
    }
    
    const imagesToSave = getImagesToSave(imageFiles)

    console.log('imageUrlsToDelete -->', imageUrlsToDelete)
    console.log('imagesToSave -->', imagesToSave)

    // =======================

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
      const resp = await updateAd(payload).unwrap()
      console.log('resp -->', resp)

      // сохраняем новые картинки
      imagesToSave.forEach(async (imageFile) => {
        try {
          if (imageFile.file) {
            const formData = new FormData()
            formData.append('file', imageFile.file)
            await adImageToAd({ idx: adId, body: formData }).unwrap()
          }
        } catch (error) {
          console.error(error)
        }
      })

      // удаляем удаленные картинки
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
      console.log('error -->', error)
    }

    console.groupEnd()

    setIsBlocked(false)
    // TODO: сделать закрытие, чтобы модалка не оставалась в истории
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
              <InputFileBar setImageFiles={setImageFiles} images={form.images}/>
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
