import React, { FC, useState } from 'react'
import { NO_IMAGE_PIC } from '../../constants'

import { ImgBar } from './ImgBar'
import { SliderContext } from './sliderContext'

import styles from './style.module.css'

// const mockImages: ImgBarType = {
//   selectedId: 0,
//   imageUrls: [
//     'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
//     'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
//     'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'  
//   ]
// }

type Props = {
  images?: string[]
}

export const Slider: FC<Props> = ({ images = [] }) => {
  const [selImage, setSelImage] = useState(0)
  const setSelImageId = (imgId = 0) => setSelImage(imgId)
  
  return (
    <SliderContext.Provider value={{ selImageId: selImage, setSelImageId }}>
      <div className={styles.fillImg}>
        <div className={styles.img}>                                        
          <img src={images[selImage] || NO_IMAGE_PIC} alt="" />
        </div>
        <ImgBar images={images} />
      </div>
    </SliderContext.Provider>
  )
}
