import React, { useEffect, useState } from 'react'
import cn from 'classnames'

import PlusIcon from '../../icons/Plus/PlusIcon'

import styles from './style.module.css'
import { useInputFileBarContext } from '../InputFileBar/inputFileBarContext'
import { API_URL } from '../../constants'

type Props = {
  id: number
  disabled?: boolean
  url?: string
}

export const InputFile = ({ id, disabled = false, url = undefined}: Props) => {
  const [imgUrl, setImgUrl] = useState('')
  const { setImageUrl } = useInputFileBarContext()
  // const [urlIn, setUrlIn] = useState('')

  useEffect(() => {
    if (url) setImgUrl(url)
  }, [url])

  // useEffect(() => {
  //   console.log('InputFile:useEffect:url -->', url)
  //   if (urlIn && !urlIn.startsWith('data:')) setImgUrl(API_URL + url)
  // }, [urlIn])
  
  useEffect(() => {
    console.log('imgUrl -->', imgUrl)
  }, [imgUrl])
  // console.log('InputFile:url -->', url)
  // console.log('InputFile:imgUrl -->', imgUrl)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    const fileName = files && files[0].name ? files[0].name : ''
    const file = files && files[0]
    console.log(fileName)
    const reader = new FileReader()
    
    reader.onload = () =>  {
      setImageUrl(reader.result as string, id, file)
      setImgUrl(reader.result as string)
    }

    reader.readAsDataURL(file as Blob);
  }
  
  return (
    <div className={cn(styles.container, disabled ? styles.disabled : '')}>
      <label htmlFor={String(id)}>
        <div className={cn(styles.img, disabled ? styles.disabled : '')}>
          {imgUrl &&<img src={imgUrl} alt="" className={styles.img}/>}
          {!imgUrl && <PlusIcon />}
        </div>
      </label>
      <input
        className={styles.inputFile}
        id={String(id)}
        name="file"
        type="file"
        accept="image/*"
        // multiple
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  )
}
