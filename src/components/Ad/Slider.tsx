import React, { FC, useState } from 'react'
import { ImgBarType } from '../../types'
import { ImgBar } from './ImgBar'

import styles from './style.module.css'

const mockImages: ImgBarType = {
  selectedId: 0,
  imageUrls: [
    'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'  
  ]
}

type Props = {
  images?: string[]
}

export const Slider: FC<Props> = ({ images = [] }) => {
  const [selImage, setSelImage] = useState(0)
  const imageData: ImgBarType = {
    selectedId: 0,
    imageUrls: images
  }

  // const handleClick = () => {
    // console.log('Slider: handleClick: imageData.selectedId -->', imageData.selectedId)
    // setSelImage(imageData.selectedId)
  // }

  const handleChange = () => {
    setSelImage(imageData.selectedId)
  }

  return (
    <div className={styles['article__fill-img']}
      // onClick={handleClick}
    >
      <div className={styles.article__img}>                                        
        <img src={images[selImage]} alt="Изображение продукта" />                             
      </div>   
      <ImgBar
        imageData={imageData}
        onChange={handleChange}
      />
    </div>
  )
}
