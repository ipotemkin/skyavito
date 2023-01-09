import React, { useEffect, useLayoutEffect, useState } from 'react'

import { API_URL } from '../../constants'
import { Image } from '../../types'
import { getImageLst, getMaxIndex } from '../../utils'
import { InputFile } from '../InputFile/InputFile'
import { InputFileBarContext } from './inputFileBarContext'

import styles from './style.module.css'

type Props = {
  setImageFiles: (imageFiles: Image[]) => void
  images?: Image[]
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const InputFileBar = ({ setImageFiles, images = [], ...props }: Props) => {
  const [imageLst, setImageLst] = useState(getImageLst(5))

  // записываем файл в imageLst
  const setImageUrl = (imgUrl = '', imgId = 0, file: Blob | null) => {
    setImageLst(prev => {
      const temp = [...prev]
      temp.forEach(image => {
        if (image.id === imgId) {
          image.url = imgUrl
          image.file = file
        }
      })
      return temp
    })
  }
  
  const delImageUrl = (imgId: number) => setImageLst(prev => {
    const newImageList = prev.filter(img => img.id !== imgId)
    const maxInd = getMaxIndex(newImageList)
    newImageList.push({ id: maxInd + 1, url: '', file: null})
    return newImageList
  })

  useLayoutEffect(() => {
    if (images.length) {
      let imgId = 0
      images.forEach((image: Image) => setImageUrl(image.url, imgId++, null))
    }  
  }, [])

  // передаем наружу файлы картинок при каждом изменении данных
  useEffect(() => {
    setImageFiles(imageLst)
  }, [imageLst])

  const makeUrlPath = (url: string) => {
    if (!url) return undefined
    return url.startsWith('data:') ? url : API_URL + url
  }

  return (
    <InputFileBarContext.Provider value={{ setImageUrl, delImageUrl }}>
      <div className={styles.inputFileBar} {...props}>
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
