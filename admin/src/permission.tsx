import React, { useEffect, useState, PropsWithChildren } from "react"
import { Flex, Spin } from 'antd'
import { useLocation, useNavigate } from "react-router-dom"
import { getItem } from "./utils"

const Prmission: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getItem("token")
    if (!token && location.pathname !== "/login") {
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