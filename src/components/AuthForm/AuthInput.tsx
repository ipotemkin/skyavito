import React, { FC } from 'react'

import styles from './style.module.css'

type Props = {
  name?: string
  type?: string
  placeholder?: string
  autoFocus?: boolean
}

export const AuthInput: FC<Props> = ({
  name = '#',
  type = 'text',
  placeholder = '',
  autoFocus = false
}) => {
  return (
    <input className={styles.input}
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
      name={name}
    />
  )
}
