import React from 'react'

import { Img } from './Img'

import styles from './style.module.css'
import { getImageLst } from './utils'

type Props = {
  images: string[]
}

export const ImgBar = ({ images }: Props) => {
  const imageLst = getImageLst(images)

  return (
    <div className={styles.imgBar}>
      {imageLst.map(
        item => <Img
          key={item.id}
          id={item.id}
          image={item.imageUrl || ''}
        />)}
    </div>
  )
}
