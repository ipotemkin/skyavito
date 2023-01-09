import React, { SVGProps } from "react"

import styles from './style.module.css'

type Props  = {
  type?: 'cross' | 'secondary'
} & SVGProps<SVGSVGElement>

const PlusIcon: React.FC<Props> = ({ type = 'cross', ...props }) => (
  <svg
    id="cross"
    className={ styles[type] }
    role="img"
    focusable = "false"
    width = "30"
    height = "30"
    viewBox="0 0 44 44"
    fill="#D9D9D9"
    stroke="#D9D9D9"
    { ...props }
  >
    
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 23 23" width="40px" height="40px">
      <path d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth="0.2"
      />
    </svg>
  </svg>
)

export default PlusIcon
