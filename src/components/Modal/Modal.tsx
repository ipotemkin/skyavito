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
}

const noop = () => void {}

export const Modal: FC<ModalProps> = ({ isOpen = noop, isModalOpenArg = false, children }) => {
  // useEscapeKey(() => setIsModalOpen(false))
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setIsModalOpen(isModalOpenArg)
  }, [isModalOpenArg])

  return (
    <ReactModal
      isOpen={isModalOpen}
      style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto' } }}
    >
      <div className={styles.modal} onClick={() => isOpen()}>
        {/* <div onClick={(e) => e.stopPropagation()}> */}
          {children}
        {/* </div> */}
      </div>
    </ReactModal>
  )
}
