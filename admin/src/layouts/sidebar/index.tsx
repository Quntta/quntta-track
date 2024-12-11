import React from "react"
import { Menu } from "antd"
import {
  // UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { useAuthNavigate } from "@/hooks"
import type { MenuProps } from "antd"

const Sidebar: React.FC = () => {
  const navigate = useAuthNavigate()
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }
  return (<>
    <div className="logo">logo</div>
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      onClick={onClick}
      items={[
        {
          key: '/',
          icon: <UserOutlined />,
          label: '首页',
        },
        {
          key: '/about',
          icon: <VideoCameraOutlined />,
          label: '关于我们',
        }
      ]}
    />
  </>)
}

export default Sidebar