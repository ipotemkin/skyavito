import React, { FC } from 'react'
import { BackArrow } from '../BackArrow/BackArrow'

import styles from './style.module.css'

type Props = {
  children?: string 
}

export const PageTitle: FC<Props> = ({ children }) => {
  return <h2 className={styles.title}>
    {/* <BackArrow /> */}
    {children}
  </h2>
}
