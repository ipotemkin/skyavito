import React, { SVGProps } from "react"

const NewIcon: React.FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    role="img"
    focusable = "false"
    width = "42"
    height = "42"
    viewBox="0 0 42 42"
    fill="none"
    { ...props }
  >
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="21" cy="21" r="20.5" stroke="#009EE4"/>
      <path d="M20.4746 11.55V29.4001" stroke="#009EE4" strokeLinecap="round"/>
      <path d="M29.3999 20.475L11.5499 20.475" stroke="#009EE4" strokeLinecap="round"/>
    </svg>
  </svg>
)

export default NewIcon
