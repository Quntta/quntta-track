import React, { PropsWithChildren } from "react"
import { Layout } from "antd"
const { Content } = Layout
const content: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <Content>
    Content
    {children}
  </Content>
}

export default content