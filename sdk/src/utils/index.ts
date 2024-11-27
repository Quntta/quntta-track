// 将字符串按照&符号分割并返回对象
export const parseString = (str: string) => { 
  if (!str) return {}
  return str.split('&').reduce((acc: any, cur: string) => { 
    const [key, value] = cur.split('=')
    acc[key] = value
    return acc
  }, {})
}

// 获取hash路由
export const getHash = (url: string) => {
  if (url) {
    const index = url.indexOf('#')
    if (index !== -1) {
      return url.slice(index + 1)
    }
  }
  return window.location.hash.slice(1)
}

// 获取history路由
export const getHistory = (url: string) => {
  let location = url ? new URL(url) : window.location
  return location.pathname
}