import React, { FC } from 'react'
import { ImgBarType } from '../../types'

import styles from './style.module.css'

type Props = {
  imageData: ImgBarType,
  id: number
  onChange: VoidFunction
}

export const Img: FC<Props> = ({
  imageData, id,
  onChange
}) => {
  const handleClick = () => {
    console.log('id =', id)
    imageData.selectedId = id
    onChange()
  }
  return (
    <div className={styles['article__img-bar-div']}>
      <img src={imageData.imageUrls[id]} alt="" onClick={handleClick}/>
    </div>
  )
}