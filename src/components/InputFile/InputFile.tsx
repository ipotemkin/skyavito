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
  
  useEffect(() => {
    if (url) setImgUrl(url)
  }, [url, flag])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const { files } = e.target
    const file = files && files[0]
    const reader = new FileReader()
    
    reader.onload = () =>  {
      setImageUrl(reader.result as string, id, file)
      setImgUrl(reader.result as string)
    }

    reader.readAsDataURL(file as Blob)
  }

  const handleDeleteOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || imgUrl) {
      // чтобы не вызывался диалог выбора файла
      e.preventDefault()
      setImgUrl('')
      delImageUrl(id)
    }
  }

  return (
    <div className={cn(styles.container, disabled ? styles.disabled : '')}>
      <label htmlFor={String(id)} style={{ marginLeft: 0 }}>
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
        disabled={disabled}
      />
    </div>
  )
}
