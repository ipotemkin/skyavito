import React, { SVGProps } from "react"

import styles from './style.module.css'

type Props  = {
  type?: 'heart' | 'secondary'
} & SVGProps<SVGSVGElement>

const HeartIcon: React.FC<Props> = ({ type = 'heart', ...props }) => (
  <svg
    className={ styles[type] }
    role="img"
    focusable = "false"
    width = "22"
    height = "19"
    viewBox="0 0 22 19"
    stroke="#009EE4"
    fillOpacity="0.15"
    fill="#009EE4"
    {...props}
  >
    <svg width="22" height="19" viewBox="0 0 22 19" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.0308 18C19.4315 13.0417 23.8104 5.54638 19.0182 2.08706C15.8751 -0.181833 12.362 1.62582 11.0308 2.77893H11H11H10.9692C9.63796 1.62582 6.12494 -0.181833 2.98181 2.08706C-1.81043 5.54638 2.56853 13.0417 10.9692 18H11H11H11.0308Z"
        fill={ props.fill }
        fillOpacity={ props.fillOpacity }
      />
      <path d="M11 2.77893H11.0308C12.362 1.62582 15.8751 -0.181833 19.0182 2.08706C23.8104 5.54638 19.4315 13.0417 11.0308 18H11M11 2.77893H10.9692C9.63796 1.62582 6.12494 -0.181833 2.98181 2.08706C-1.81043 5.54638 2.56852 13.0417 10.9692 18H11"
        stroke={ props.stroke }
        strokeWidth="2"
      />
    </svg>
  </svg>
)

export default HeartIcon
