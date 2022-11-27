import React, { FC } from 'react'
import { ImgBarType } from '../../types'

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
  imageData: ImgBarType
  onChange: VoidFunction
}

export const ImgBar: FC<Props> = ({
  imageData,
  onChange
}) => {
  // const imageLst = getImageLst(images)

  return (
    <div className={styles['article__img-bar']}>
      {imageData.imageUrls.map(
        (item, index) => <Img
          key={index}
          imageData={imageData}
          id={index}
          onChange={onChange}
        />)}
    </div>
  )
}
