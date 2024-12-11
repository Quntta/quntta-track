import React, { useEffect, useState, PropsWithChildren } from "react"
import { Flex, Spin } from 'antd'
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const Prmission: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const token = useSelector((state: RootState) => state.user.userInfo.token)
  useEffect(() => {
    if (!token && location.pathname !== "/login") {
      console.log('token', token, location.pathname)
      navigate("/login", { replace: true })
    } else {
      setLoading(false)
    }
  }, [location.pathname, navigate])

  if (loading) {
    return (<Flex align="center" gap="middle">
      <Spin size="large" />
    </Flex>)
  }

  return <>{children}</>
}

export default Prmission