import { useContext } from "react"
import { ConfigProvider } from "antd"

interface Custom {
  [key: string]: string
}
interface CustomLocale {
  custom?: Custom
}
const useCustomLocale = () => {
  const { locale } = useContext(ConfigProvider.ConfigContext)
  try {
    const { custom } = locale as CustomLocale || {}
    return custom || {}
  } catch (error) {
    console.error(error)
    return {}
  }
}

export default useCustomLocale