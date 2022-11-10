import React, { FC } from 'react'
import cn from 'classnames'

import styles from './style.module.css'

export type ButtonProps = {
  type?: 'action' | 'outlined' | 'secondary' | 'tertiary'
  size?: 's' | 'm' | 'l'
  buttonStatus?: 'normal' | 'disabled'
  children?: string
  btnType?: 'button' | 'submit' | 'reset'
  onClick?: VoidFunction
  disabled?: boolean
}

export const Button: FC<ButtonProps> = ({
  type = 'action',
  size = 'm',
  children,
  btnType,
  onClick,
  disabled = false,
}) => {
  const buttonClassName = cn(
    styles.button,
    styles[`${type}`],
    styles[`${disabled ? 'disabled' : 'normal'}`],
    styles[`${size}`]
  )

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      type={btnType}
      disabled={disabled}
    >
      {children ? children : ''}
    </button>
  )
}
