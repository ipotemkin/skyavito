import React, { SVGProps } from "react"

import styles from './style.module.css'

type Props  = {
  type?: 'cross' | 'secondary'
} & SVGProps<SVGSVGElement>

const CrossIcon: React.FC<Props> = ({ type = 'cross', ...props }) => (
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
    <svg width="43" height="43" viewBox="0 0 43 43" xmlns="http://www.w3.org/2000/svg">
      <path d="M31.8193 10.6066L10.6061 31.8198"
        stroke={ props.stroke }
        strokeWidth="2"
      />
      <path d="M31.8193 31.8198L10.6061 10.6066"
        stroke= { props.stroke }
        strokeWidth="2"
      />
    </svg>
  </svg>
)

export default CrossIcon
