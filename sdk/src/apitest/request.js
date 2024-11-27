import axios from 'axios'

let baseURL = '/'
const service = axios.create({
  baseURL,
  timeout: 60000,
  withCredentials: true,
})

service({
  method: 'post',
  url: '/api/v1/xxx/hahaha',
  data: {
    test: 'gagaga'
  }
})
export default service
