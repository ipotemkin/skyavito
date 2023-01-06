import { skipToken } from '@reduxjs/toolkit/dist/query'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { useDelAdMutation, useGetAdReviewsQuery, useGetAdQuery } from '../../api/products.api'
import { Avatar } from '../../components/Avatar/Avatar'
import { Button } from '../../components/Button/Button'
import { Slider } from '../../components/Slider/Slider'
import { API_URL } from '../../constants'
import { useAppSelector } from '../../hooks/appHooks'
import { ROUTES } from '../../routes'
import { selectAccessToken } from '../../slices/tokenSlice'
import { Image } from '../../types'
import { formatSellsFrom, formatString, getUserEmailFromJWT, prettyDate } from '../../utils'
import { formatPhone, getPhoneMasked } from '../../validators'
import { Page } from '../Page/Page'

import styles from './style.module.css'

const convertImages = (imagesIn: Image[]) => {
  return imagesIn.map((item: Image) => API_URL + item.url)
}

export const Ad = () => {
  const location = useLocation()
  
  // загружаем объявление и комментарии
  const productId = Number(useParams()?.id)
  const { data: product, isLoading, isError } = useGetAdQuery(productId ?? skipToken)
  const { data: reviews } = useGetAdReviewsQuery(productId ?? skipToken)

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
  
  // show phone number =======================================================
  const [isPhoneMasked, setIsPhoneMasked] = useState(true)
  const phoneDb = product?.user?.phone || ''
  const phone = isPhoneMasked ? getPhoneMasked(phoneDb) : formatPhone(phoneDb)
  const handlePhoneClick = () => setIsPhoneMasked(false)
  // =========================================================================

  // delete advertissment ====================================================
  const navigate = useNavigate()
  const [deleteAd] = useDelAdMutation()
  const handleDeleteAd = async () => {
    try {
      await deleteAd(productId).unwrap()
      navigate(-1)
    } catch (error) {
      console.error(error)
    }
  }
  // =========================================================================

  if (isLoading) return (
    <Page>
      <div className={styles.content}><h2>Загрузка...</h2></div>
    </Page>
  )

  if (isError) {
    setTimeout(() => navigate(-1), 800)
    return (
      <Page>
        <div className={styles.content}><h2>Нет такого объявления</h2></div>
      </Page>
    )
  }

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
                  <Link to={ROUTES.editAd + `/${product?.id}`} state={{ background: location }}>
                    <Button height={50}>Редактировать</Button>
                  </Link>
                  <Button height={50} onClick={handleDeleteAd}>Снять&nbsp;с&nbsp;публикации</Button>
                </>
                : <Button onClick={handlePhoneClick}>
                  {/* Показать&nbsp;телефон<br/><span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span> */}
                  Показать&nbsp;телефон<br/>
                  <span>
                    {/* {product?.user?.phone && getPhoneMask(clearPhone(product?.user?.phone))} */}
                    {phone}
                  </span>
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
                <p className={styles.authorAbout}>Продает товары с&nbsp;{product?.user?.sells_from && formatSellsFrom(product?.user?.sells_from)}</p>
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