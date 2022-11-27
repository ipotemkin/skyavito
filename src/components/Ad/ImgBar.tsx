import React, { FC } from 'react'

import { Img } from './Img'

import styles from './style.module.css'

const templateLst = [1, 2, 3, 4, 5]

type ImageType = {
  id: number
  imageUrl: string
}

const getImageLst = (images: string[]) => {
  const imageLst = [...templateLst]
  return (
    imageLst.map(i => ({ id: i, imageUrl: images[i-1] || undefined })) as ImageType[]
  )
}

type Props = {
  images?: string[]
}

export const ImgBar: FC<Props> = ({ images = []}) => {
  const imageLst = getImageLst(images)

  return (
    <div className={styles['article__img-bar']}>
      {imageLst.map(item => <Img key={item.id} imageUrl={item.imageUrl}/>)}
    </div>
  )
}
