import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Route from '@/route'
import { Provider } from 'react-redux'
import store from './store'
import 'dayjs/locale/zh-cn'
import './index.css'
import ConfigProviderWrapper from './configProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProviderWrapper>
        <Route />
      </ConfigProviderWrapper>
    </Provider>
  </StrictMode>,
)
