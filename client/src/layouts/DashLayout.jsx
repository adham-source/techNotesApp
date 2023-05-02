import { Outlet } from "react-router-dom"
import { PulseLoader } from "react-spinners"
import { Suspense, lazy } from "react"

const DashHeader = lazy(() => import("../components/DashHeader"))
const DashFooter = lazy(() => import("../components/DashFooter"))

const DashLayout = () => {
  return (
    <section className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Suspense fallback={<PulseLoader color={"#FFF"} />}>
        <DashHeader />
      </Suspense>

      <section className="flex-1 py-4">
        <div className="container mx-auto space-y-4 py-5 px-2">
          <Suspense fallback={<PulseLoader color={"#FFF"} />}>
            <Outlet />
          </Suspense>
        </div>
      </section>
      <Suspense fallback={<PulseLoader color={"#FFF"} />}>
        <DashFooter />
      </Suspense>
    </section>
  )
}

export default DashLayout
