import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from "jwt-decode"

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isManager = false
  let isAdmin = false
  let status = "Employee"

  if (token) {
    const decoded = jwtDecode(token)
    const { name, email, roles } = decoded

    isManager = roles.includes("Manager")
    isAdmin = roles.includes("Admin")

    if (isManager) status = "Manager"
    if (isAdmin) status = "Admin"

    return { name, email,roles, status, isManager, isAdmin }
  }

  return { name: "", email: "", roles: [], isManager, isAdmin, status }
}
export default useAuth
