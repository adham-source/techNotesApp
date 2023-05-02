import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { PulseLoader } from "react-spinners"
 

const Layout = () => {
  return (
    <Suspense fallback={<PulseLoader color="#FFF" />}>
      <Outlet />
    </Suspense>
  )
  
}

export default Layout