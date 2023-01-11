import React, { useState } from "react"

import { formatPhone, getPhoneMasked } from "../../../validators/phoneNumber"
import { Button } from "../Button/Button"

type Props = {
  phone?: string
}

export const ButtonWithPhone = ({ phone = '' }: Props) => {
  const [isPhoneMasked, setIsPhoneMasked] = useState(true)
  const phoneFormatted = isPhoneMasked ? getPhoneMasked(phone) : formatPhone(phone)
  
  const handlePhoneClick = () => setIsPhoneMasked(false)

  if (!phone) return (
    <Button disabled>
      Телефон&nbsp;не&nbsp;предоставлен
    </Button>
  )

  return (
    <Button onClick={handlePhoneClick}>
      Показать&nbsp;телефон<br/>
      <span>{phoneFormatted}</span>
    </Button>
  )  
}
