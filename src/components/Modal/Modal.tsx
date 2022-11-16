import React, { FC, ReactNode, useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useEscapeKey } from '../../hooks/formHooks'
// import { container } from '../..'

// import { useEscapeKey } from '../../hooks/formHooks'

import styles from './style.module.css'

ReactModal.setAppElement('#root')

type ModalProps = {
  isOpen?: VoidFunction
  children?: ReactNode
  handleOpen?: VoidFunction
  handleClose?: VoidFunction
  isModalOpenArg?: boolean
  mode?: 'desktopOnly' | undefined
}

const noop = () => void {}

export const Modal: FC<ModalProps> = ({
  isOpen = noop,
  isModalOpenArg = false,
  mode = undefined,
  children }) => {
  // useEscapeKey(() => setIsModalOpen(false))
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setIsModalOpen(isModalOpenArg)
  }, [isModalOpenArg])

  return (
    <ReactModal className={styles.content}
      isOpen={isModalOpen}
      // style={ mode === undefined ? { content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto' } } : {}}
    >
      <div className={styles.modal} onClick={() => isOpen()}>
        {/* <div onClick={(e) => e.stopPropagation()}> */}
          {children}
        {/* </div> */}
      </div>
    </ReactModal>
  )
}
