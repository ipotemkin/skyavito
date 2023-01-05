import React, { useEffect, useState } from 'react'
import cn from 'classnames'

import PlusIcon from '../../icons/Plus/PlusIcon'

import styles from './style.module.css'
import { useInputFileBarContext } from '../InputFileBar/inputFileBarContext'
import DeleteIcon from '../../icons/Delete/DeleteIcon'

type Props = {
  id: number
  disabled?: boolean
  url?: string
}

export const InputFile = ({ id, disabled = false, url = undefined}: Props) => {
  const [imgUrl, setImgUrl] = useState('')
  const { setImageUrl, delImageUrl } = useInputFileBarContext()
  const flag = true
  // const [urlIn, setUrlIn] = useState('')

  console.log('InputFile:id -->', id)
  console.log('InputFile:imgUrl -->', imgUrl)
  
  useEffect(() => {
    if (url) setImgUrl(url)
  }, [url, flag])

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
    e.preventDefault()
    e.stopPropagation()

    // if (imgUrl) {
    //   e.preventDefault()
    //   return
    // }

    const { files } = e.target
    const fileName = files && files[0].name ? files[0].name : ''
    const file = files && files[0]
    console.log(fileName)
    const reader = new FileReader()
    
    reader.onload = () =>  {
      console.log('onload:id -->', id)
      setImageUrl(reader.result as string, id, file)
      setImgUrl(reader.result as string)
    }

    reader.readAsDataURL(file as Blob);
  }

  const handleDeleteOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('handleDeleteOnClick')
    if (disabled || imgUrl) {
      // чтобы не вызывался диалог выбора файла
      e.stopPropagation()
      e.preventDefault()
      setImgUrl('')
      delImageUrl(id)
    }
    // setImgUrl('')
  }

  return (
    <div className={cn(styles.container, disabled ? styles.disabled : '')}>
      <label htmlFor={String(id)}>
        <div className={cn(styles.img, disabled ? styles.disabled : '')}>
          {imgUrl && <>
            <img src={imgUrl} alt="" className={styles.img}/>
            <div className={cn(styles.deleteIcon)} onClick={handleDeleteOnClick}>
              <DeleteIcon />
            </div>
          </>}
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
        // onClick={handleDeleteOnClick}
        disabled={disabled}
      />
    </div>
  )
}
