import React from "react"
import { Outlet } from "react-router"

const DashboardLayout: React.FC = () => {
  return <div>
    Dashboard Layout
    <Outlet />
  </div>
}

export default DashboardLayout