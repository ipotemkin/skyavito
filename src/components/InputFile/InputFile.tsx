import React, { FC, useState } from 'react'
import cn from 'classnames'

import PlusIcon from '../../icons/Plus/PlusIcon'

import styles from './style.module.css'
import { useInputFileBarContext } from '../InputFileBar/inputFileBarContext'

type Props = {
  id: number
  disabled?: boolean
}

export const InputFile: FC<Props> = ({ id, disabled = false}) => {
  const [imgUrl, setImgUrl] = useState('')
  const { setImageUrl } = useInputFileBarContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    const fileName = files && files[0].name ? files[0].name : ''
    const file = files && files[0]
    console.log(fileName)
    const reader = new FileReader()
    
    reader.onload = () =>  {
      setImageUrl(reader.result as string, id)
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
