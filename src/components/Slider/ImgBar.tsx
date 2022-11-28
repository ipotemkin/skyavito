import React, { FC } from 'react'

import { Img } from './Img'

import styles from './style.module.css'

// const templateLst = [0, 1, 2, 3, 4]

// type ImageType = {
//   id: number
//   imageUrl: string
// }

const getImageLst = (images: string[], count = 5) => {
  const imageLst = []
  const len = images.length
  const maxLen = len == 0 ? count : len
  for (let i = 0; i < maxLen; i++) imageLst.push({ id: i, imageUrl: images[i] || undefined })
  // return (
  //   imageLst.map(i => ({ id: i, imageUrl: images[i] || undefined })) as ImageType[]
  // )
  return imageLst
}

type Props = {
  images: string[]
}

export const ImgBar: FC<Props> = ({ images }) => {
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
