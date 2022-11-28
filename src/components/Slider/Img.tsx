import React, { FC } from 'react'
import { useSliderContext } from './sliderContext'
import cn from 'classnames'

import styles from './style.module.css'

type Props = {
  image: string,
  id: number
}

export const Img: FC<Props> = ({ image, id }) => {
  const { selImageId, setSelImageId } = useSliderContext()

  const handleClick = () => setSelImageId(id)
  
  return (
    <div className={cn(styles.imgBarDiv, selImageId == id ? styles.selected : '')}>
      <img src={image} alt="" onClick={handleClick}/>
    </div>
  )
}