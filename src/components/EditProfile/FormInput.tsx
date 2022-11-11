import React, { FC } from 'react'

import styles from './style.module.css'

type Props = {
  value?: string
  label?: string
  placeholder?: string
  width?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const noop = () => void {}

export const FormInput: FC<Props> = ({
  value = '',
  width = 260,
  label = '',
  placeholder = '',
  onChange = noop,
  ...props
}) => {

  return (
    <div className={styles.settings__div}>
      <label className={styles.label} htmlFor="name">{label}</label>
      <input className={styles.input} name="name"
        type="text"
        // value="Ан"
        placeholder={placeholder}
        onChange={onChange}
        style={{ width }}
        { ...props }
      />
    </div>
  )
}
