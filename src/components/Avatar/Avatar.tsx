import React, { FC } from 'react'
import cn from 'classnames'

import styles from './style.module.css'

type Props = {
  size?: 's' | 'l'
}

export const Avatar: FC<Props> = ({ size = 'l' }) => {
  return (
    <div className={cn(styles.avatar, styles[size])}>
      <a href="" target="_self">
        <img src="#" alt=""/>
      </a>
    </div>
  )
}
