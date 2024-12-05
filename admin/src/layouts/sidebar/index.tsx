import React from "react"
import { Menu } from "antd"
import {
  // UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { useNavigate, Link } from "react-router-dom"
// import type { MenuProps } from "antd"
const Sidebar: React.FC = () => {
  // const navigate = useNavigate()
  // const onClick: MenuProps['onClick'] = (e) => {
  //   console.log(e)
  //   navigate('/about')
  // }
  return (<>
    <div className="logo">logo</div>
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      items={[
        {
          key: '1',
          icon: <UserOutlined />,
          label: <Link to="/">首页</Link>,
        },
        {
          key: '2',
          icon: <VideoCameraOutlined />,
          label: <Link to="/about">关于我们</Link>,
        }
      ]}
    />
  </>)
}

export default Sidebar