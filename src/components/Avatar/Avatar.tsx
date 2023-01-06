import React from 'react'
import cn from 'classnames'

import styles from './style.module.css'
import { API_URL } from '../../constants'

type Props = {
  size?: 's' | 'l'
  image?: string
}

export const Avatar = ({ size = 'l', image }: Props) => {
  const imageUrl = image ? API_URL + image : undefined

  return (
    <div className={cn(styles.avatar, styles[size])}>
        <img src={imageUrl} alt=""/>
    </div>
  )
}
