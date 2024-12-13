import React, { PropsWithChildren } from "react"
import { ConfigProvider } from "antd"
import { useCustomLocale, MyLocalProvider } from './locale/useLocale'
import type { Locale } from 'antd/lib/locale'

const ConfigProviderWrapper: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { customLocale } = useCustomLocale()
  return <ConfigProvider theme={{ cssVar: true, hashed: false }} locale={customLocale as Locale}>{children}</ConfigProvider>
}

const Root: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
  <MyLocalProvider>
    <ConfigProviderWrapper>
      {children}
    </ConfigProviderWrapper>
  </MyLocalProvider>
)

export default Root