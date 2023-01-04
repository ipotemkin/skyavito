import { skipToken } from '@reduxjs/toolkit/dist/query'
import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { useGetProductCommentsQuery, useGetProductQuery } from '../../api/products.api'
import { Avatar } from '../../components/Avatar/Avatar'
import { Button } from '../../components/Button/Button'
import { Slider } from '../../components/Slider/Slider'
import { API_URL } from '../../constants'
import { useAppSelector } from '../../hooks/appHooks'
import { ROUTES } from '../../routes'
import { selectAccessToken } from '../../slices/tokenSlice'
import { Image } from '../../types'
import { formatString, getUserEmailFromJWT, prettyDate } from '../../utils'
import { Page } from '../Page/Page'

import styles from './style.module.css'

const convertImages = (imagesIn: Image[]) => {
  return imagesIn.map((item: Image) => API_URL + item.url)
}

export const Ad = () => {
  const location = useLocation()
  
  // загружаем объявление и комментарии
  const productId = Number(useParams()?.id)
  const { data: product, isLoading } = useGetProductQuery(productId ?? skipToken)
  const { data: reviews } = useGetProductCommentsQuery(productId ?? skipToken)

  // проверяем, является ли текущий пользователь владельцем объявления
  const token = useAppSelector(selectAccessToken)
  const userEmail = token && getUserEmailFromJWT(token)
  const seller = product?.user?.email === userEmail

  // готовим список картинок к объявлению
  const imagesIn: Image[] = product && product.images ? product.images : []
  const images = convertImages(imagesIn)
  
  // ссылка на отзывы
  const linkEnabled = (
    // если нет отзывов
    (!reviews || reviews.length === 0)
    // если пользователь не авторизован или является автором объявления
    && (!userEmail || (userEmail && seller))
  ) ? false : true
  
  const linkText = reviews && reviews.length > 0
    ? <span>отзывов: {reviews.length}</span>
    : userEmail && <span>добавьте свой отзыв</span>

  if (isLoading) return (
    <Page>
      <div className={styles.content}>Загрузка...</div>
    </Page>
  )

  return (
    <Page>
      <div className={styles.content}>
        <div className={styles.left}><Slider images={images} /></div>
        <div className={styles.right}>
          <div className={styles.block}>
            <h3 className={styles.title}>{product?.title}</h3>
            <div className={styles.info}>
              <p className={styles.date}>{prettyDate(String(product?.created_on)) }</p>
              <p className={styles.city}>{ product?.user?.city }</p>
              {linkEnabled ? <Link
                  className={styles.link}
                  to={formatString(ROUTES.reviews, [`${productId}`])}
                  state={{ background: location }}
                >{linkText}</Link>
              : <span className={styles.city}>отзывов пока нет</span>}
            </div>
            <p className={styles.price}>{((product?.price || 0) ).toLocaleString()} ₽</p>
            <div className={styles.btnBlock}>
              {seller
                ? <>
                  <Button height={50}>Редактировать</Button>
                  <Button height={50}>Снять&nbsp;с&nbsp;публикации</Button>
                </>
                : <Button>
                  Показать&nbsp;телефон<br/><span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>          
              </Button>}
            </div>
            
            <div className={styles.author}>
              <div style={{ width: 40, height: 40 }}>
                <Avatar size="s" image={product?.user?.avatar} />                
              </div>
              <div className={styles.authorCont}>
                <Link to={ROUTES.sellerProfile + '/' + product?.user?.id}>
                  <p className={styles.authorName}>{product?.user?.name || product?.user?.email}</p>
                </Link>
                <p className={styles.authorAbout}>Продает товары с&nbsp;{product?.user?.sells_from}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainContainer}>
        <h3 className={styles.mainTitle}>Описание товара</h3>
        <div className={styles.mainContent}>
          <p className={styles.mainText}>{product?.description}</p>
        </div>
      </div>
    </Page>
  )
}