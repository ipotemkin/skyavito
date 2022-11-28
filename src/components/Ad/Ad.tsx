import { skipToken } from '@reduxjs/toolkit/dist/query'
import React, { FC } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { useGetProductQuery } from '../../api/products.api'
import { Page } from '../../pages/Page/Page'
import { ROUTES } from '../../routes'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'
import { Slider } from '../Slider/Slider'

import styles from './style.module.css'

const mockImages = [
  'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
  'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
  'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'  
]

// const mockImages1: ImgBarType = {
//   selectedId: 0,
//   imageUrls: [
//     'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
//     'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
//     'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'  
//   ]
// }

type Props = {
  mode?: 'seller' | null
  // productId?: number
}

export const Ad: FC<Props> = ({ mode = null }) => {
  const location = useLocation()
  // const { id } = useParams()
  const productId = Number(useParams()?.id)
  // console.log('productId -->', productId)
  const { data: product } = useGetProductQuery(productId ?? skipToken)
  // const { data: product } = useGetProductQuery(2)

  return (
    <Page>
      <div className={styles.content}>
        <div className={styles.left}>
          {/* <Slider images={[product?.image || '']} /> */}
          <Slider images={mockImages} />
        </div>
        <div className={styles.right}>
          <div className={styles.block}>
            <h3 className={styles.title}>{product?.title}</h3>
            <div className={styles.info}>
              <p className={styles.date}>Сегодня в 10:45</p>
              <p className={styles.city}>Санкт-Петербург</p>
              <Link
                className={styles.link}
                to={ROUTES.reviews}
                state={{ background: location }}
              >
                4 отзыва
              </Link>
            </div>
            <p className={styles.price}>{((product?.price || 0) * 1000).toLocaleString()} ₽</p>
            <div className={styles.btnBlock}>
              {mode !== 'seller' && <Button>
                Показать&nbsp;телефон<br/><span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>          
              </Button>}
              
              {/* {mode === 'seller' && <Button width={189} height={50}>Редактировать</Button>} */}
              {mode === 'seller' && <Button height={50}>Редактировать</Button>}
              {mode === 'seller' && <Button height={50}>Снять&nbsp;с&nbsp;публикации</Button>}
            </div>
            
            <div className={styles.author}>
              <div style={{ width: 40, height: 40 }}>
                <Avatar size="s" />                
              </div>
              <div className={styles.authorCont}>
                <p className={styles.authorName}>Антон</p>
                <p className={styles.authorAbout}>Продает товары с&nbsp;мая 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainContainer}>
        <h3 className={styles.mainTitle}>
          Описание товара
        </h3>
        <div className={styles.mainContent}>
        <p className={styles.mainText}>{product?.description}</p>
          {/* <p className={styles.main__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>           */}
        </div>
      </div>
    </Page>
  )
}