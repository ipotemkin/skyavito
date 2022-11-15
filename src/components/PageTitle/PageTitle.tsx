import React, { FC } from 'react'

import styles from './style.module.css'

type Props = {
  children?: string 
}

export const PageTitle: FC<Props> = ({ children }) => {
  return <h2 className={styles.title}>
    {children}
  </h2>
}
