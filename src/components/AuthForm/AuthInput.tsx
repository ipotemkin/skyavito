import React from 'react'
import { InputType } from 'zlib'

import styles from './style.module.css'

type Props = {
  // name?: string
  type?: string
  placeholder?: string
  autoFocus?: boolean
  ref?: React.LegacyRef<HTMLInputElement>
}

export const AuthInput = ({
  // name = '#',
  type = 'text',
  placeholder = '',
  autoFocus = false,
  ref,
  // ...props
}: Props) => {
  return (
    <input className={styles.input}
      ref={ref}
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
      // {...props}
      // name={name}
    />
  )
}
