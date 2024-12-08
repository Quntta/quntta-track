import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Route from '@/route'
import 'dayjs/locale/zh-cn'
import './index.css'
import ConfigProviderWrapper from './configProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProviderWrapper>
      <Route />
    </ConfigProviderWrapper>
  </StrictMode>,
)
