import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Flex, Spin } from 'antd'
import NotFound from '@/pages/404'
import LayOut from '@/layouts/index'
import Permission from '@/permission'
import { authRoute, unAuthRoute } from './routes'
const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Flex align="center" gap="middle">
        <Spin size="large" />
      </Flex>}>
        <Permission>
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
        </Permission>
      </Suspense>
    </Router>
  )
}

export default App