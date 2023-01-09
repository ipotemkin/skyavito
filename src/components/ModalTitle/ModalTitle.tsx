import React, { FC } from 'react'
import { BackArrow } from '../BackArrow/BackArrow'

import styles from './style.module.css'

type Props = {
  children?: string 
}

export const ModalTitle: FC<Props> = ({ children }) => {
  return <h2 className={styles.title}>
    <BackArrow stroke="black"/>
    {children}
  </h2>
}
