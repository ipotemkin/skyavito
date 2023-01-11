import React from 'react'

import { BackArrow } from '../BackArrow/BackArrow'

import styles from './style.module.css'

type Props = {
  children?: string 
}

export const ModalTitle = ({ children }: Props) => {
  return <h2 className={styles.title}>
    <BackArrow stroke="black"/>
    {children}
  </h2>
}
