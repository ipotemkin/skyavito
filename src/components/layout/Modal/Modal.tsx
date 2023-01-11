import React, { FC, ReactNode, useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router-dom'

import { useEscapeKey } from '../../../hooks/formHooks'

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
  // mode = undefined,
  children }) => {

  const navigate = useNavigate()
  // useEscapeKey(() => setIsModalOpen(false))
  useEscapeKey(() => navigate(-1))
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setIsModalOpen(isModalOpenArg)
  }, [isModalOpenArg])

  return (
    <ReactModal
      className={styles.content}
      isOpen={isModalOpen}
    >
      <div className={styles.modal} onClick={() => isOpen()}>
        {children}
      </div>
    </ReactModal>
  )
}
