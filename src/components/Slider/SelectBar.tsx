import React from 'react'

import { SelectButton } from './SelectButton'

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
  
  for (let i = 0; i < maxLen; i++)
    imageLst.push({ id: i, imageUrl: images[i] || undefined })

  return imageLst
}

type Props = {
  images: string[]
}

export const SelectBar = ({ images }: Props) => {
  const imageLst = getImageLst(images)

  return (
    <div className={styles.selectBar}>
      {imageLst.map(item => <SelectButton key={item.id} id={item.id} />)}
    </div>
  )
}
