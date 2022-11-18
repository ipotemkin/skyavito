import React, { FC } from 'react'

import styles from './style.module.css'

type Props = {
  type?: string
  placeholder?: string
  autoFocus?: boolean
}

export const AuthInput: FC<Props> = ({
  type = 'text',
  placeholder = '',
  autoFocus = false
}) => {
  return (
    <input className={styles.input}
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
    />
  )
}
