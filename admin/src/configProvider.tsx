import React, { PropsWithChildren } from "react"
import { ConfigProvider } from "antd"
import useLocale from './locale/useLocale'
import type { Locale } from 'antd/lib/locale'

const ConfigProviderWrapper: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [locale] = useLocale()
  const antdLocale = locale as Locale // 添加这一行
  return <ConfigProvider theme={{ cssVar: true, hashed: false }} locale={antdLocale}>{children}</ConfigProvider>
}

export default ConfigProviderWrapper