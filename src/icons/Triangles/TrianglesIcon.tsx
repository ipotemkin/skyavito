import React, { SVGProps } from "react"

import styles from './style.module.css'

type Props  = {
  type?: 'triangles' | 'secondary'
} & SVGProps<SVGSVGElement>

const TrianglesIcon: React.FC<Props> = ({ type = 'triangles', ...props }) =>  (
  <svg
    className={ styles[type] }
    role="img"
    focusable = "false"
    width = "56"
    height = "38"
    viewBox="0 0 56 38"
    fill="none"
    { ...props }
  >
    <svg width="56" height="38" viewBox="0 0 56 38" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.89126 36.6721C2.88089 38.9885 0 37.0581 0 33.6245C0 29.9693 0 19.0017 0 19.0017C0 19.0017 0 8.03413 0 4.37888C0 0.945258 2.8791 -0.985148 6.89126 1.33134C13.1373 4.93834 31.8738 15.7629 31.8738 15.7629C34.3651 17.2018 34.3651 20.7998 31.8738 22.2387C31.8738 22.2405 13.1373 33.0651 6.89126 36.6721Z"
        fill="#00C1FF"
      />
      <path d="M27.5138 36.6686C23.5034 38.9851 20.6226 37.0547 20.6226 33.6211C20.6226 29.9658 20.6226 18.9983 20.6226 18.9983C20.6226 18.9983 20.6226 8.03072 20.6226 4.37546C20.6226 0.94184 23.5017 -0.988566 27.5138 1.32792C33.6223 4.85627 51.9478 15.4431 51.9478 15.4431C54.6839 17.0232 54.6839 20.9734 51.9478 22.5534C51.946 22.5534 33.6223 33.1403 27.5138 36.6686Z"
        fill="#BCEC30"
      />
    </svg>
  </svg>
)

export default TrianglesIcon
