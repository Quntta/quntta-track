import React from "react"
import { Menu } from "antd"
import {
  // UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { useAuthNavigate } from "@/hooks"
import { useNavigate, Link, useLocation } from "react-router-dom"
import type { MenuProps } from "antd"

const Sidebar: React.FC = () => {
  // const navigate = useNavigate()
  // const location = useLocation()
  const navigate = useAuthNavigate()
  // const checkPermission = (path: string) => {
  //   // 在这里添加你的权限校验逻辑
  //   const num = Math.random()
  //   console.log('num', num)
  //   const hasPermission = num > 0.5 // 替换为实际的权限校验逻辑
  //   if (!hasPermission) {
  //     navigate('/')
  //   }
  // }
  // React.useEffect(() => {
  //   checkPermission(location.pathname)
  // }, [location.pathname])
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('e', e, 'navigate', navigate)
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