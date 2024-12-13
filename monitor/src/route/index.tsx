import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Flex, Spin } from 'antd'
import NotFound from '@/pages/404'
import Permission from '@/permission'
import { authRoute } from './routes'
const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Flex align="center" gap="middle">
        <Spin size="large" />
      </Flex>}>
        <Permission>
          <Routes>
            {authRoute.map((route, index) => (
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