import React from 'react'

import styles from './style.module.css'

type Props = {
  children?: string 
}

export const PageTitle = ({ children }: Props) => {
  return <h2 className={styles.title}>
    {children}
  </h2>
}
