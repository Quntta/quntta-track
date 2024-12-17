import React, { PropsWithChildren } from "react"
import { Layout } from "antd"
const { Content } = Layout
import './index.css'
const content: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <Content className="site-layout-background" style={{
    margin: '24px 16px',
    padding: 24,
    minHeight: 280
  }}>
    <div id="container">
      Content
      {children}
    </div>
  </Content>
}

export default content