import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { LoginModal } from '../../components/AuthForm/LoginModal'
import { SignupModal } from '../../components/AuthForm/SignupModal'
import { Gallery } from '../../components/Gallery/Gallery'
import { Header } from '../../components/Header/Header'
import { AdModal } from '../../components/AdModal/AdModal'
import { Search } from '../../components/Search/Search'
import { goods } from '../../fixtures/goods'

import styles from './style.module.css'
import { Review } from '../../components/Review/Review'
import { ReviewList } from '../../components/ReviewList/ReviewList'
import { ReviewModal } from '../../components/ReviewModal/ReviewModal'
import HomeIcon from '../../icons/Home/HomeIcon'
import NewIcon from '../../icons/New/NewIcon'
import ProfileIcon from '../../icons/Profile/ProfileIcon'
import { Footer } from '../../components/Footer/Footer'
import { LogoMob } from '../../components/LogoMob/LogoMob'
import { SearchMob } from '../../components/SearchMob/SearchMob'

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
      {/* <AdModal type="edit" /> */}
      {/* <ReviewModal /> */}
      {/* <header><Header /></header>
      <div className={styles.desktop}>
        <Search />
      </div>
      <div className={styles.mobile}>
        <SearchMob />
      </div> */}
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.h2}>Объявления</h2>
          <Gallery items={goods} />
        </div>
      </div>
      <LoginModal />
      <SignupModal />
      <AdModal />

      {/* <footer>
        <Footer />
      </footer> */}
    </div>
  )
}