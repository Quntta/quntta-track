import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotFound from '@/pages/404'
import LayOut from '@/layouts/index'
import { authRoute, unAuthRoute } from './routes'
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayOut />}>
          {authRoute.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Route>
        {unAuthRoute.map((route, index) => (
          <Route key={index} {...route} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App