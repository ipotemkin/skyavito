import React, { SVGProps } from "react"

import styles from './style.module.css'

type Props  = {
  type?: 'cross' | 'secondary'
} & SVGProps<SVGSVGElement>

const BackIcon: React.FC<Props> = ({ type = 'cross', ...props }) => (
  <svg
    className={ styles[type] }
    role="img"
    focusable = "false"
    width = "43"
    height = "43"
    viewBox="0 0 43 43"
    stroke="#D9D9D9"
    fill="none"
    { ...props }
  >
    <svg width="14" height="25" viewBox="0 0 14 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 1L1.5 12.5L13 24" stroke={props.stroke} strokeWidth="2"/>
    </svg>
  </svg>
)

export default BackIcon
