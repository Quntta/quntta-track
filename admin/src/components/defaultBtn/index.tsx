import React from "react"
import { Button } from "antd"
import classNames from "classnames"
import "./index.less"
type DefaultBtnProps = {
  type?: 'primary' | 'default' | 'text' | 'link'
  active?: boolean
  onClick: () => void
  children?: React.ReactNode
}
const DefaultBtn: React.FC<DefaultBtnProps> = ({ type = 'default', onClick, children = 'submit' }) => {
  return <Button onClick={onClick} type={type} className={classNames({ 'default-btn': type === 'default', 'link-btn': type === 'link' })}>{children}</Button>
}

export default DefaultBtn