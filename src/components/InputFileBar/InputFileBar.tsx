import React, { useEffect, useState } from 'react'
import { InputFile } from '../InputFile/InputFile'
import { InputFileBarContext } from './inputFileBarContext'

import styles from './style.module.css'

// const adImages = [1, 2, 3, 4, 5]

type Image = {
  id: number
  url: string
  file: Blob | null
}

const getImageLst = (count = 5): Image[] => {
  const res = []
  for (let i = 0; i < count; i++) res.push({ id: i, url: '', file: null })
  return res
}

type Props = {
  setImageFiles: (imageFiles: Image[]) => void
}

export const InputFileBar = ({ setImageFiles }: Props) => {
  const [imageLst, setImageLst] = useState(getImageLst(5))

  const setImageUrl = (imgUrl = '', imgId = 0, file: Blob | null) => {
    setImageLst(prev => {
      const temp = [...prev]
      temp[imgId] = { ...temp[imgId], url: imgUrl, file }
      return temp
    })
  }

  // передаем наружу файлы картинок при каждом изменении данных
  useEffect(() => {
    setImageFiles(imageLst)
  }, [imageLst])

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
