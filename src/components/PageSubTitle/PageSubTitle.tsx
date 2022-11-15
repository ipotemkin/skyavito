import React, { FC } from 'react'

import styles from './style.module.css'

type Props = {
  children?: string 
}

export const PageSubTitle: FC<Props> = ({ children }) => {
  return <h3 className={styles.subtitle}>
    {children}
  </h3>
}
