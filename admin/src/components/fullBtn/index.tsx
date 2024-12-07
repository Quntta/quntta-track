import React from "react"
import { Button } from "antd"
import "./index.less"
type FullBtnProps = {
  type?: 'primary' | 'default'
  onClick: () => void
  children?: React.ReactNode
  disabled?: boolean
}
const FullBtn: React.FC<FullBtnProps> = ({ type = 'primary', onClick, children = 'submit', disabled = false }) => {
  return <Button onClick={onClick} type={type} className="full-btn" disabled={disabled}>{children}</Button>
}

export default FullBtn