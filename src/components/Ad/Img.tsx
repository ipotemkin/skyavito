import React, { FC } from 'react'

import styles from './style.module.css'

type Props = {
  imageUrl?: string
}

export const Img: FC<Props> = ({ imageUrl }) => {
  return (
    <div className={styles['article__img-bar-div']}>
      <img src={imageUrl} alt="" />
    </div>
  )
}