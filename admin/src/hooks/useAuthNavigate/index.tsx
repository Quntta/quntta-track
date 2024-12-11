import { useNavigate } from "react-router-dom"
import { getItem } from "@/utils"
const useAuthNavigate = () => {
  const navigate = useNavigate()
  const usePermission = (path: string) => {
    // 在这里添加你的权限校验逻辑
    const userInfo = getItem('userInfo')
    if (!userInfo.token) {
      navigate('/login')
    } else {
      navigate(path)
    }
  }
  return usePermission
}

export default useAuthNavigate