import React, { useEffect, useState } from 'react'
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

export const FormInput = ({
  label = '',
  onChange = noop,
  autoFocus = false,
  wide = false,
  ...props
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [screenWidth, setScreenWidth] = useState<number>(0)

  useEffect(() => {
    setScreenWidth(window.screen.width)
  }, [window.screen.width])

  return (
    <div className={styles.settings__div}>
      <label className={styles.label} htmlFor="name">{label}</label>
      <input className={cn(styles.input, wide ? styles.wide : '')} name="name"
        type="text"
        onChange={onChange}
        autoFocus={autoFocus}
        { ...props }
      />
    </div>
  )
}
