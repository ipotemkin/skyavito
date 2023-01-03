import React, {
  // FC, lazy, useEffect, useState
} from 'react'
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate,
  // Outlet, Navigate
} from 'react-router-dom'
import { AdModal } from './components/AdModal/AdModal'
import { LoginModal } from './components/AuthForm/LoginModal'
import { SignupModal } from './components/AuthForm/SignupModal'
import { ReviewModal } from './components/ReviewModal/ReviewModal'
import { useAppSelector } from './hooks/appHooks'
import { AdMyPage } from './pages/AdMyPage/AdMyPage'
import { AdPage } from './pages/AdPage/AdPage'

import { Main } from './pages/Main/Main'
import { Profile } from './pages/Profile/Profile'
import { SellerProfile } from './pages/SellerProfile/SellerProfile'
import { selectAccessToken } from './slices/tokenSlice'
import { checkJWTExpTime, formatString } from './utils'

export const ROUTES = {
  home: '/',
  profile: '/profile',
  sellerProfile: '/seller-profile',
  adPage: '/ad-page',
  adMyPage: '/ad-my-page',
  newAd: '/new-ad',
  login: '/login',
  signup: '/signup',
  // reviews: '/reviews',
  reviews: '/ads/{}/reviews',
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
  // const navigate = useNavigate()
  // console.log('ProtectedRoute: location -->', location)
  // const background = location.state && location.state.background

  // if (isAllowed === undefined) redirectPath = ROUTES.login
  
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
  const token = useAppSelector(selectAccessToken)

  const isTokenValid = () => {
    if (!token) return false
    return checkJWTExpTime(token)
  }

  // console.log('background -->', background)
  // console.log('location -->', location)

  // const user = useAppSelector(selectCurrentUser)
  // const message = useAppSelector(selectMessage)
  // const dispatch = useAppDispatch()

  // если поставить false, то даже если в куках есть данные, перенаправляет на home page
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(true)

  // const isTokenValid = user.idToken ? checkJWTExpTime(user.idToken) : false

  // useEffect(() => {
  //   // просим пользователя перезайти
  //   if (message) setIsLoggedIn(undefined)

  //   // просим пользователя перезайти
  //   else if (user.needRelogin) {
  //     dispatch(setMessage(EXP_MESSAGE))
  //     Cookies.remove(accessTokenName)
  //     setIsLoggedIn(undefined)
  //   }

  //   // если токен валиден, редиректим на заданную страницу
  //   else if (isTokenValid || (user.idToken && !user.needRelogin))
  //     setIsLoggedIn(true)

  //   // если токена нет, редиректим на home page
  //   else setIsLoggedIn(false)
  // }, [user.idToken, user.needRelogin, isTokenValid, dispatch, message])

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
        {/* <Route path={ROUTES.profile} element={<Profile />} /> */}
        <Route path={ROUTES.sellerProfile + '/:id' } element={<SellerProfile />} />
        <Route path={ROUTES.adPage + '/:id'} element={<AdPage />} />
        <Route path={ROUTES.adMyPage} element={<AdMyPage />} />
        <Route path={'*'} element={<Main />} />
        {/* <Route path={'*'} element={<h2>Page not found</h2>} /> */}
        
        {/* <Route path={ROUTES.login} element={<LoginModal />} />
        <Route path={ROUTES.signup} element={<SignupModal />} />
        <Route path={ROUTES.newAd} element={<AdModal />} />
        <Route path={ROUTES.reviews} element={<ReviewModal />} /> */}
        <Route element={<ProtectedRoute isAllowed={isTokenValid()} />}>
          <Route path={ROUTES.profile} element={<Profile />} />
        </Route>

      </Routes>
        {background && (
          <Routes>
            {/* <Route element={<ProtectedRoute isAllowed={token ? true: false} />}>
              <Route path={ROUTES.profile} element={<Profile />} />
            </Route> */}
            <Route path={ROUTES.login} element={<LoginModal />} />
            <Route path={ROUTES.signup} element={<SignupModal />} />
            <Route path={ formatString(ROUTES.reviews, [':id'])} element={<ReviewModal />} />
            <Route element={<ProtectedRoute isAllowed={isTokenValid()} />}>
              <Route path={ROUTES.newAd} element={<AdModal />} />
            </Route>
          </Routes>
        )}
    </>
  )
}
