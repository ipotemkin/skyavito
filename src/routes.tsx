import React, {
  // FC, lazy, useEffect, useState
} from 'react'
import { Route, Routes,
  // Outlet, Navigate
} from 'react-router-dom'
import { SignupModal } from './components/AuthForm/SignupModal'


import { Main } from './pages/Main/Main'
import { Profile } from './pages/Profile/Profile'

export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  admin: '/admin',
  aboutCourse: '/aboutcourse',
  profile: '/profile',
  workout: '/courses/{}/workouts/{}', // '/courses/:id/workouts/:day'
}

// type Props = {
//   redirectPath?: string
//   isAllowed?: boolean
// }

// const ProtectedRoute: FC<Props> = ({
//   redirectPath = ROUTES.home,
//   isAllowed,
// }) => {
//   if (isAllowed === undefined) redirectPath = ROUTES.login

//   if (!isAllowed) return <Navigate to={redirectPath} replace={true} />

//   return <Outlet />
// }

export const AppRoutes = () => {  
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
    <Routes>
      <Route path={ROUTES.home} element={<Main />} />
      <Route path={ROUTES.profile} element={<Profile />} />
      <Route path={ROUTES.signup} element={<SignupModal />} />
    </Routes>
  )
}
