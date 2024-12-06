import { useNavigate } from "react-router-dom"
import { getItem } from "@/utils"
const useAuthNavigate = () => {
  const navigate = useNavigate()
  const checkPermission = (path: string) => {
    // 在这里添加你的权限校验逻辑
    const token = getItem('token')
    if (!token) {
      navigate('/login')
    } else {
      navigate(path)
    }
  }
  return checkPermission
}

export default useAuthNavigate