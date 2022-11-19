import React from 'react'

import { Img } from './Img'

import styles from './style.module.css'

const images = [1, 2, 3, 4, 5]

export const ImgBar = () => {
  return (
    <div className={styles['article__img-bar']}>
      {images.map(i => <Img key={i}/>)}
    </div>
  )
}
