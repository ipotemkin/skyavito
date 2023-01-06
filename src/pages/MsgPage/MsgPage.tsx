import React from 'react'

import { Page } from "../Page/Page"

import styles from './style.module.css'

type Props = {
  message: string
}

export const MsgPage = ({ message }: Props) => (
  <Page>
    <div className={styles.content}>
      <h2>{message}</h2>
    </div>
  </Page>
)
