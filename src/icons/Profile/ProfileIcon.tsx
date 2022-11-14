import React, { SVGProps } from "react"

const ProfileIcon: React.FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    role="img"
    focusable = "false"
    width = "28"
    height = "27"
    viewBox="0 0 28 27"
    fill="none"
    { ...props }
  >
    <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="13.5" r="13" stroke="#009EE4"/>
      <path d="M4.66113 22.6607C5.73159 18.5017 9.50701 15.4286 14.0002 15.4286C18.4092 15.4286 22.127 18.3876 23.2762 22.428" stroke="#009EE4"/>
      <circle cx="14.0001" cy="8.67854" r="4.32143" stroke="#009EE4"/>
    </svg>
  </svg>
)

export default ProfileIcon
