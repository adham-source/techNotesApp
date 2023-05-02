import { Outlet, Link } from "react-router-dom"
import { Suspense, lazy, useEffect, useRef, useState } from "react"
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"
import { PulseLoader } from "react-spinners"

const ErrorMessage = lazy(() => import("../../errors/ErrorMessage"))

const PersistLogin = () => {
  const [persist] = usePersist()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation()

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token")
        try {
          // const response =
          await refresh()
          // const { accessToken } = response.data
          setTrueSuccess(true)
        } catch (err) {
          console.error(err)
        }
      }

      if (!token && persist) verifyRefreshToken()
    }

    return () => (effectRan.current = true)

    // eslint-disable-next-line
  }, [])

  let content
  if (!persist) {
    // persist: no
    console.log("no persist")
    content = (
      <Suspense fallback={<PulseLoader color="#FFF" />}>
        <Outlet />
      </Suspense>
    )
  } else if (isLoading) {
    // persist: yes, token: no
    console.log("loading")
    content = <PulseLoader color="#FFF" />
  } else if (isError) {
    //persist: yes, token: no
    console.log("error")
    content = (
      <>
        <Suspense fallback={<PulseLoader color="#FFF" />}>
          <ErrorMessage errorMessage={error?.data?.message} />
        </Suspense>
        <div className="text-center mt-4">
          <Link to="/login" className="text-xl text-blue-700 underline">
            Please login again
          </Link>
        </div>
      </>
    )
  } else if (isSuccess && trueSuccess) {
    // persist: yes, token: yes
    console.log("success")
    content = (
      <Suspense fallback={<PulseLoader color="#FFF" />}>
        <Outlet />
      </Suspense>
    )
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit")
    console.log(isUninitialized)
    content = (
      <Suspense fallback={<PulseLoader color="#FFF" />}>
        <Outlet />
      </Suspense>
    )
  }

  return content
}
export default PersistLogin
