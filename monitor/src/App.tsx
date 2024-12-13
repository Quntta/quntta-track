import ConfigProvider from './configProvider'
import Route from './route'
import { Provider } from 'react-redux'
import store from './store'
import './App.css'

function App() {

  return (
    <Provider store={store}>
      <ConfigProvider>
        <Route />
      </ConfigProvider>
    </Provider>
  )
}

export default App
