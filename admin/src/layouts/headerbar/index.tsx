import React from "react"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'

interface NavbarProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const { collapsed, setCollapsed } = props
  return <div>
    <div onClick={() => setCollapsed(!collapsed)} className='trigger'>
      {
        collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />
      }
    </div>

  </div>
}

export default Navbar