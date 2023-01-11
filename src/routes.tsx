import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'

import { AdModal } from './components/AdModal/AdModal'
import { UpdateAdModal } from './components/AdModal/UpdateAdModal'
import { LoginModal } from './components/AuthForm/LoginModal'
import { SignupModal } from './components/AuthForm/SignupModal'
import { ChangePasswordModal } from './components/ChangePassword/ChangePasswordModal'
import { ReviewModal } from './components/ReviewModal/ReviewModal'
import { useAppSelector } from './hooks/appHooks'
import { Ad } from './pages/AdPage/Ad'
import { Main } from './pages/Main/Main'
import { Profile } from './pages/Profile/Profile'
import { SellerProfile } from './pages/SellerProfile/SellerProfile'
import { selectTokens } from './slices/tokenSlice'
import { checkJWTExpTime, formatString } from './utils'

export const ROUTES = {
  home: '/',
  profile: '/profile',
  sellerProfile: '/seller-profile',
  adPage: '/ad-page',
  newAd: '/new-ad',
  editAd: '/edit-ad',
  login: '/login',
  signup: '/signup',
  reviews: '/ads/{}/reviews',
  changePassword: '/change-password',
}

type Props = {
  redirectPath?: string
  isAllowed?: boolean
}

const ProtectedRoute = ({
  redirectPath = ROUTES.login,
  isAllowed,
}: Props) => {
  const location = useLocation()
  
  if (!isAllowed) {
    return <Navigate
      to={redirectPath}
      replace={true}
      state={{ background: location.state.prevLoc || location }}
    />
  }

  return <Outlet />
}

export const AppRoutes = () => {
  const location = useLocation()
  const background = location.state && location.state.background
  const { access_token, refresh_token } = useAppSelector(selectTokens)

  const isToken = access_token ? true : false
  const isRefreshTokenValid = refresh_token && checkJWTExpTime(refresh_token) ? true : false

  // если поставить false, то даже если в куках есть данные, перенаправляет на home page
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  useEffect(() => {
    if (isToken && isRefreshTokenValid) setIsLoggedIn(true)
    else setIsLoggedIn(false) 
  }, [isToken, isRefreshTokenValid])

  return (
    <>
      <Routes location={{
        ...(background || location),
        state: {
          // ...background.state,
          prevLoc: location,
          prevPrevLoc: location.state?.prevLoc,
        }
      }} >
        <Route path={ROUTES.home} element={<Main />} />
        <Route path={ROUTES.sellerProfile + '/:id' } element={<SellerProfile />} />
        <Route path={ROUTES.adPage + '/:id'} element={<Ad />} />
        <Route path={'*'} element={<Main />} />
        
        <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
          <Route path={ROUTES.profile} element={<Profile />} />
        </Route>

      </Routes>
        {background && (
          <Routes>
            <Route path={ROUTES.login} element={<LoginModal />} />
            <Route path={ROUTES.signup} element={<SignupModal />} />
            <Route path={ formatString(ROUTES.reviews, [':id'])} element={<ReviewModal />} />
            <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
              <Route path={ROUTES.newAd} element={<AdModal />} />
              <Route path={ROUTES.editAd + '/:id'} element={<UpdateAdModal />} />
              <Route path={ROUTES.changePassword} element={<ChangePasswordModal />} />
            </Route>
          </Routes>
        )}
    </>
  )
}
