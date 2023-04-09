import { Outlet } from "react-router-dom"
import DashHeader from "../components/DashHeader"
import DashFooter from "../components/DashFooter"
const DashLayout = () => {
  return (
    <section className="flex flex-col min-h-screen bg-gray-900 text-white">
      <DashHeader />
      <section className="flex-1 py-4">
        <div className="container mx-auto space-y-4 py-5">
          <Outlet />
        </div>
      </section>
      <DashFooter />
    </section>
  )
}

export default DashLayout
