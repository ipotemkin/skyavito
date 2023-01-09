import cn from 'classnames'
import React from 'react'

import { API_URL, NO_AVATAR_PIC } from '../../constants'
import styles from './style.module.css'

type Props = {
  size?: 's' | 'l'
  image?: string
}

export const Avatar = ({ size = 'l', image }: Props) => {
  const imageUrl = image ? API_URL + image : undefined

  return (
    <div className={cn(styles.avatar, styles[size])}>
      <img src={imageUrl || NO_AVATAR_PIC} alt=""/>
    </div>
  )
}
