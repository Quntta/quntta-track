import React from "react"
import { Outlet } from "react-router"
import Navbar from "./navbar"
import Sidebar from "./sidebar"
import LContent from "./content"

const LayOut: React.FC = () => {
  return <div>
    <Sidebar />
    <Navbar />
    <LContent>
      <Outlet />
    </LContent>
  </div>
}

export default LayOut