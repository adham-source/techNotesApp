import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { Suspense } from "react"
import { PulseLoader } from "react-spinners"

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation()
  const { roles } = useAuth()

  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Suspense fallback={<PulseLoader color="#FFF" />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )

  return content
}
export default RequireAuth
