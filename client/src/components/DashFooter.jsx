import { useNavigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"

const DashFooter = () => {
  const {name, email, status} = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onGoHomeClicked = () => navigate("/dash")
  const goHomeButton =
    pathname !== "/dash" ? (
      <button
        className="rounded-full bg-gray-700 hover:bg-gray-600 text-white p-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    ) : null

  return (
    <footer className="bg-gray-800 text-white border-t py-3">
      <div className="container mx-auto flex justify-between items-center px-2">
        <div className="flex-1">
          <p className="text-sm">Current User: {name}, Email: {email}</p>
          <p className="text-sm">Status: {status}</p>
        </div>
        <div>{goHomeButton}</div>
      </div>
    </footer>
  )
}

export default DashFooter
