import React, { useState } from 'react'

import { NO_IMAGE_PIC } from '../../../constants'
import { BackArrow } from '../BackArrow/BackArrow'
import { ImgBar } from './ImgBar'
import { SelectBar } from './SelectBar'
import { SliderContext } from './sliderContext'

import styles from './style.module.css'

type Props = {
  images?: string[]
}

export const Slider = ({ images = [] }: Props) => {
  const [selImage, setSelImage] = useState(0)
  const setSelImageId = (imgId = 0) => setSelImage(imgId)
  
  return (
    <SliderContext.Provider value={{ selImageId: selImage, setSelImageId }}>
      <div className={styles.fillImg}>
        <div className={styles.img}>
          <div className={styles.backArrow}>
            <BackArrow />
          </div>
          <img src={images[selImage] || NO_IMAGE_PIC} alt="" />
          <SelectBar images={images}/>
        </div>
        <ImgBar images={images} />
      </div>
    </SliderContext.Provider>
  )
}
