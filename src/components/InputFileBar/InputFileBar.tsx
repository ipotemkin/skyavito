import React, { useState } from 'react'
import { InputFile } from '../InputFile/InputFile'
import { InputFileBarContext } from './inputFileBarContext'

import styles from './style.module.css'

// const adImages = [1, 2, 3, 4, 5]

type Image = {
  id: number
  url: string
}

const getImageLst = (count = 5): Image[] => {
  const res = []
  for (let i = 0; i < count; i++) res.push({ id: i, url: '' })
  return res
}

export const InputFileBar = () => {
  const [imageLst, setImageLst] = useState(getImageLst(5))

  const setImageUrl = (imgUrl = '', imgId = 0) => {
    setImageLst(prev => {
      const temp = [...prev]
      temp[imgId] = { ...temp[imgId], url: imgUrl }
      return temp
    })
  }

  return (
    <InputFileBarContext.Provider value={{ setImageUrl }}>
      <div className={styles.inputFileBar}>
        {imageLst.map((image, index) => {
          let disabled = true
          if (
            image.url ||
            index === 0 ||
            imageLst[index - 1].url && (index === imageLst.length - 1 || !imageLst[index + 1].url)
          ) disabled = false

          return <InputFile key={image.id} disabled={disabled} id={image.id}/>
        })}
      </div>
    </InputFileBarContext.Provider>
  )
}
