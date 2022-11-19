import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Page } from '../../pages/Page/Page'
import { ROUTES } from '../../routes'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'
import { ImgBar } from './ImgBar'

import styles from './style.module.css'

type Props = {
  mode?: 'seller' | null
}

export const Ad: FC<Props> = ({ mode = null }) => {
  const location = useLocation()

  return (
    <Page>
      <div className={styles.content}>
        <div className={styles.left}>
            <div className={styles['article__fill-img']}>
                <div className={styles.article__img}>                                        
                  <img src="" alt="" />                             
                </div>   
                <ImgBar />                                 
            </div>                                
        </div>
        <div className={styles.right}>
          <div className={styles.article__block}>
            <h3 className={styles.article__title}>Ракетка для большого тенниса Triumph Pro STС Б/У</h3>
            <div className={styles.article__info}>
              <p className={styles.article__date}>Сегодня в 10:45</p>
              <p className={styles.article__city}>Санкт-Петербург</p>
              <Link
                className={styles.article__link}
                to={ROUTES.reviews}
                state={{ background: location }}
              >
                4 отзыва
              </Link>
            </div>
            <p className={styles.article__price}>2 200 ₽</p>
            <div className={styles.btnBlock}>
              {mode !== 'seller' && <Button>
                Показать&nbsp;телефон<br/><span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>          
              </Button>}
              
              {/* {mode === 'seller' && <Button width={189} height={50}>Редактировать</Button>} */}
              {mode === 'seller' && <Button height={50}>Редактировать</Button>}
              {mode === 'seller' && <Button height={50}>Снять&nbsp;с&nbsp;публикации</Button>}
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
    </Page>
  )
}