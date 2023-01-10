import React from 'react'

import { SelectButton } from './SelectButton'

import styles from './style.module.css'
import { getImageLst } from './utils'

type Props = {
  images: string[]
}

export const SelectBar = ({ images }: Props) => {
  const imageLst = getImageLst(images)

  return (
    <div className={styles.selectBar}>
      {imageLst.map(item => <SelectButton key={item.id} id={item.id} />)}
    </div>
  )
}
