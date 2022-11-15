import React, { FC, useEffect, useState } from 'react'
import cn from 'classnames'

import styles from './style.module.css'

type Props = {
  value?: string
  label?: string
  placeholder?: string
  width?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  wide?: boolean
}

const noop = () => void {}

export const FormInput: FC<Props> = ({
  // value = '',
  // width = '',
  label = '',
  // placeholder = '',
  onChange = noop,
  autoFocus = false,
  wide = false,
  ...props
}) => {
  const [screenWidth, setScreenWidth] = useState<number>(0)

  useEffect(() => {
    setScreenWidth(window.screen.width)
  }, [window.screen.width])

  return (
    <div className={styles.settings__div}>
      <label className={styles.label} htmlFor="name">{label}</label>
      <input className={cn(styles.input, wide ? styles.wide : '')} name="name"
        type="text"
        // value="Ан"
        // placeholder={placeholder}
        onChange={onChange}
        // style={{ width }}
        // style={ screenWidth < 620 ? { width: '100%' } : { width } }
        autoFocus={autoFocus}
        { ...props }
      />
    </div>
  )
}
