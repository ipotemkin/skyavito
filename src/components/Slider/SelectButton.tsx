import cn from 'classnames'
import React from 'react'

import { useSliderContext } from './sliderContext'

import styles from './style.module.css'

type Props = {
  id: number
}

export const SelectButton = ({ id }: Props) => {
  const { selImageId, setSelImageId } = useSliderContext()
  
  const handleClick = () => setSelImageId(id)
  
  return (
    <div className={cn(styles.selectButton, selImageId == id ? styles.selectButtonSelected : '')}
      onClick={handleClick}
    >
    </div>
  )
}
