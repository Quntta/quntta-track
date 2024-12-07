import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import Route from '@/route'
import './index.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={{ cssVar: true, hashed: false }}>
      <Route />
    </ConfigProvider>
  </StrictMode>,
)
