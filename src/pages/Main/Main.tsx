import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { LoginModal } from '../../components/AuthForm/LoginModal'
import { SignupModal } from '../../components/AuthForm/SignupModal'
import { Gallery } from '../../components/Gallery/Gallery'
import { Header } from '../../components/Header/Header'
import { AdModal } from '../../components/AdModal/AdModal'
import { Search } from '../../components/Search/Search'
import { goods } from '../../fixtures/goods'

import styles from './style.module.css'

export const Main = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  // const modalRef = useRef(null)

  // useEffect(() => {
  //   if (modalRef.current) {
  //     console.log('Modal: useEffect')
  //     const el = modalRef.current as HTMLDivElement
  //     el.setAttribute('tabindex', '0')
  //     el.addEventListener("focusout", (ev)=> {
  //       if (!el.contains(ev.relatedTarget as Node | null)) el.focus()
  //     })
  //   }
  // }, [])

  return (
    // <div ref={modalRef}>
    <div>
      <Header />
      <Search />
      <AdModal type="edit" />

      {/* <div className={styles.container}>
        <h2 className={styles.h2}>Объявления</h2>
        <div className={styles.content}>
          <Gallery items={goods} />
        </div>
      </div>
      <LoginModal />
      <SignupModal /> */}
    </div>
  )
}