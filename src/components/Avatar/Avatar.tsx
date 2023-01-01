import React, { FC } from 'react'
import cn from 'classnames'

import styles from './style.module.css'
import { API_URL } from '../../constants'

type Props = {
  size?: 's' | 'l'
  image?: string
}

export const Avatar: FC<Props> = ({ size = 'l', image }) => {
  const imageUrl = API_URL + image

  return (
    <div className={cn(styles.avatar, styles[size])}>
      {/* <a href="" target="_self"> */}
        <img src={imageUrl} alt=""/>
      {/* </a> */}
    </div>
  )
}
