import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import "./index.css"
import Headerbar from "./headerbar"
import Sidebar from "./sidebar"
import Content from "./content"
import { Layout } from "antd"
const { Header, Sider } = Layout
const MyLayOut: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout className="root-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Sidebar />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Headerbar collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MyLayOut