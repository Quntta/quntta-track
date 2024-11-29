import Home from '@/pages/home'
import About from '@/pages/about'
import Login from '@/pages/login'
import NotFount from '@/pages/404'
export const authRoute = [
  { index: true, element: <Home /> },
  { path: 'about/:id', element: <About /> },
  { path: '*', element: <NotFount /> }
]

export const unAuthRoute = [
  { path: '/login', element: <Login /> }
]