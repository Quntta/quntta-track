import React from 'react'
const Home = React.lazy(() => import('@/pages/home'))
const About = React.lazy(() => import('@/pages/about'))
const NotFount = React.lazy(() => import('@/pages/404'))
export const authRoute = [
  { index: true, element: <Home /> },
  { path: 'about', element: <About /> },
  { path: '*', element: <NotFount /> }
]
