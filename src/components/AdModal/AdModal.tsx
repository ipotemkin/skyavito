import React, { FC, useState } from 'react'

import CrossIcon from '../../icons/Cross/CossIcon'
import PlusIcon from '../../icons/Plus/PlusIcon'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import styles from './style.module.css'

const adImages = [1, 2, 3, 4, 5]

type Props = {
  type?: 'new' | 'edit'
}

export const AdModal: FC<Props> = ({ type = 'new' }) => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  let title = 'Редактировать объявление'
  let btnName = 'Сохранить'
  if (type === 'new') {
    title = 'Новое объявление'
    btnName = 'Опубликовать'
  }
  
  const handleClose = () => {
    console.log('close btn')
    setIsModalOpen(false)
  }
  
  return (
    <Modal isModalOpenArg={isModalOpen}>
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
                  name="name"
                  placeholder="Введите название"
                  autoFocus
                />
            </div>
            <div className={styles.formBlock}>
                <label htmlFor="text">Описание</label>                            
                <textarea className={styles.area}
                  name="text"
                  id="formArea"
                  rows={10}
                  placeholder="Введите описание"
                />
            </div>
            <div className={styles.formBlock}>
                <p className={styles.p}>Фотографии товара<span>не более 5 фотографий</span></p>
                <div className={styles.imgBar}>
                  {adImages.map(image => (
                      <div className={styles.img} key={image} onClick={() => console.log(`image #${image}`)}>
                          <img src="" alt=""/>
                          <PlusIcon />
                      </div>
                  ))}
                </div>
            </div>
            <div className={styles.formBlock}>
                <label htmlFor="price">Цена</label>
                <input className={styles.price} type="text" name="price" placeholder=" ₽"/>
            </div>
           
            <Button width={200} disabled>{btnName}</Button>
            
        </form>
    </div>
    </Modal>
  )
}
