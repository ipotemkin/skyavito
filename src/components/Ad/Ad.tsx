import React, { FC, ReactElement, useEffect, useRef, useState } from 'react'
import { LoginModal } from '../AuthForm/LoginModal'
import { SignupModal } from '../AuthForm/SignupModal'
import { Button } from '../Button/Button'
import { Gallery } from '../Gallery/Gallery'
import { Header } from '../Header/Header'
import { Search } from '../Search/Search'
import { goods } from '../../fixtures/goods'

import styles from './style.module.css'
import { Avatar } from '../Avatar/Avatar'
import { SearchMob } from '../SearchMob/SearchMob'
import { Footer } from '../../components/Footer/Footer'

type Props = {
  mode?: 'seller' | null
}

export const Ad: FC<Props> = ({ mode = null }) => {
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
      <header><Header /></header>
      <div className={styles.desktop}>
        <Search />
      </div>
      <div className={styles.mobile}>
        <SearchMob />
      </div>

      <div className={styles.container}>
        {/* <Search /> */}
        {/* <h2 className={styles.h2}>AdvPage</h2> */}
        <div className={styles.content}>                           
          <div className={styles.left}>
              <div className={styles['article__fill-img']}>
                  <div className={styles.article__img}>                                        
                          <img src="" alt="" />                             
                  </div>                                    
                  <div className={styles['article__img-bar']}>
                      <div className={styles['article__img-bar-div']}>
                          <img src="" alt="" />
                      </div>
                      <div className={styles['article__img-bar-div']}>
                          <img src="" alt="" />
                      </div>
                      <div className={styles['article__img-bar-div']}>
                          <img src="" alt="" />
                      </div>
                      <div className={styles['article__img-bar-div']}>
                          <img src="" alt="" />
                      </div>
                      <div className={styles['article__img-bar-div']}>
                          <img src="" alt="" />
                      </div>
                  </div>
              </div>                                
          </div>
          <div className={styles.right}>
            <div className={styles.article__block}>
              <h3 className={styles.article__title}>Ракетка для большого тенниса Triumph Pro STС Б/У</h3>
              <div className={styles.article__info}>
                <p className={styles.article__date}>Сегодня в 10:45</p>
                <p className={styles.article__city}>Санкт-Петербург</p>
                <a className={styles.article__link} href="" target="_blank" rel="">4 отзыва</a>
              </div>
              <p className={styles.article__price}>2 200 ₽</p>
              <div className={styles.btnBlock}>
                {mode !== 'seller' && <Button width={214}>
                  Показать&nbsp;телефон<br/><span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>          
                </Button>}
                
                {mode === 'seller' && <Button width={189} height={50}>Редактировать</Button>}
                {mode === 'seller' && <Button width={230} height={50}>Снять с публикации</Button>}
              </div>
              
              <div className={styles.article__author}>
                <Avatar size="s" />
                <div className={styles.author__cont}>
                  <p className={styles.author__name}>Антон</p>
                  <p className={styles.author__about}>Продает товары с&nbsp;мая 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.main__container}>
          <h3 className={styles.main__title}>
            Описание товара
          </h3>
          <div className={styles.main__content}>
            <p className={styles.main__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>          
          </div>
            
        </div>

      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}