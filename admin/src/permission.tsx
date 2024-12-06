import React, { useEffect, useState, PropsWithChildren } from "react"
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
    return <div>Loading...</div>
  }

  return <>{children}</>
}

export default Prmission