import cn from 'classnames'
import React from 'react'

import { useSliderContext } from './sliderContext'

import styles from './style.module.css'

type Props = {
  image: string,
  id: number
}

export const Img = ({ image, id }: Props) => {
  const { selImageId, setSelImageId } = useSliderContext()
  
  // чтобы не показывать картинку поврежденного изображения при его отсутствии
  const imageUrl = image ? image : undefined

  const handleClick = () => setSelImageId(id)
  
  return (
    <div className={cn(styles.imgBarDiv, selImageId == id ? styles.selected : '')}>
      <img src={imageUrl} alt="" onClick={handleClick}/>
    </div>
  )
}
