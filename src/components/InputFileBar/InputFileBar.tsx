import React, { useEffect, useLayoutEffect, useState } from 'react'
import { API_URL } from '../../constants'

import { Image } from '../../types'
import { getImageLst } from '../../utils'
import { InputFile } from '../InputFile/InputFile'
import { InputFileBarContext } from './inputFileBarContext'

import styles from './style.module.css'

type Props = {
  setImageFiles: (imageFiles: Image[]) => void
  images?: Image[]
}

export const InputFileBar = ({ setImageFiles, images = [] }: Props) => {
  const [imageLst, setImageLst] = useState(getImageLst(5))

  // записываем файл в imageLst
  const setImageUrl = (imgUrl = '', imgId = 0, file: Blob | null) => {
    setImageLst(prev => {
      const temp = [...prev]
      temp[imgId] = { ...temp[imgId], url: imgUrl, file }
      return temp
    })
  }

  useLayoutEffect(() => {
    console.log('images -->', images)

    if (images.length) {
      let imgId = 0
      images.forEach((image: Image) => {
        setImageUrl(image.url, imgId, null)
        imgId++
      })
      console.log(imageLst)
    }  
  }, [])

  useEffect(() => {
    console.log('imageLst -->', imageLst)
  }, [imageLst])

  // передаем наружу файлы картинок при каждом изменении данных
  useEffect(() => {
    setImageFiles(imageLst)
  }, [imageLst])

  const makeUrlPath = (url: string) => {
    if (!url) return undefined
    return url.startsWith('data:') ? url : API_URL + url
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

          return <InputFile key={image.id} disabled={disabled} id={image.id} url={makeUrlPath(image.url)}/>
        })}
      </div>
    </InputFileBarContext.Provider>
  )
}
