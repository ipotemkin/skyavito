import React, { useState } from 'react'
import { LoginModal } from '../../components/AuthForm/LoginModal'
import { SignupModal } from '../../components/AuthForm/SignupModal'
import { Gallery } from '../../components/Gallery/Gallery'
import { AdModal } from '../../components/AdModal/AdModal'
import { goods } from '../../fixtures/goods'

import { Page } from '../Page/Page'
import { PageTitle } from '../../components/PageTitle/PageTitle'

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
    <Page>
      <PageTitle>Объявления</PageTitle>
      <Gallery items={goods} />
    </Page>
  )
}