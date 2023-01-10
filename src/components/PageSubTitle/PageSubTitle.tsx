import React from 'react'

import styles from './style.module.css'

type Props = {
  children?: string 
}

export const PageSubTitle = ({ children }: Props) => {
  return <h3 className={styles.subtitle}>
    {children}
  </h3>
}
