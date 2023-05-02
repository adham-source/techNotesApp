import { Suspense, lazy, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from "react-router-dom"

import { useSendLogoutMutation } from "../features/auth/authApiSlice"
import { PulseLoader } from "react-spinners"
import useAuth from "../hooks/useAuth"

const ErrorMessage = lazy(() => import("../errors/ErrorMessage"))

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()

    useEffect(() => {
      if (isSuccess) navigate("/")
    }, [isSuccess, navigate])

     const onNewNoteClicked = () => navigate("/dash/notes/new")
     const onNewUserClicked = () => navigate("/dash/users/new")
     const onNotesClicked = () => navigate("/dash/notes")
     const onUsersClicked = () => navigate("/dash/users")

    

    let dashClass = null
    if (
      !DASH_REGEX.test(pathname) &&
      !NOTES_REGEX.test(pathname) &&
      !USERS_REGEX.test(pathname)
    ) {
      dashClass = "dash-header__container--small"
    }

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
      newNoteButton = (
        <button
          className="flex items-center text-white hover:text-gray-300"
          title="New Note"
          onClick={onNewNoteClicked}
        >
          <FontAwesomeIcon icon={faFileCirclePlus} />
        </button>
      )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
      newUserButton = (
        <button
          className="flex items-center text-white hover:text-gray-300"
          title="New User"
          onClick={onNewUserClicked}
        >
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      )
    }

    let userButton = null
    if (isManager || isAdmin) {
      if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
        userButton = (
          <button
            className="flex items-center text-white hover:text-gray-300"
            title="Users"
            onClick={onUsersClicked}
          >
            <FontAwesomeIcon icon={faUserGear} />
          </button>
        )
      }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
      notesButton = (
        <button
          className="flex items-center text-white hover:text-gray-300"
          title="Notes"
          onClick={onNotesClicked}
        >
          <FontAwesomeIcon icon={faFilePen} />
        </button>
      )
    }

    const logoutButton = (
      <button
        className="flex items-center text-white hover:text-gray-300"
        title="Logout"
        onClick={sendLogout}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
  
      </button>
    )

    // const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if (isLoading) {
      buttonContent = <PulseLoader color={"#FFF"} />
    } else {
      buttonContent = (
        <>
          {newNoteButton}
          {newUserButton}
          {notesButton}
          {userButton}
          {logoutButton}
        </>
      )
    }
   

    const content = (
      <>
        <Suspense fallback={<PulseLoader color="#FFF" />}>
          {isError ? <ErrorMessage errorMessage={error?.data?.message} /> : ""}
        </Suspense>

        {/* <p className={errClass}>{error?.data?.message}</p> */}
        <header className="bg-gray-800 text-white border-b py-3">
          <div className="container mx-auto flex justify-between items-center px-2">
            <Link to="/dash">
              <h1 className="text-xl font-bold">techNotes</h1>
            </Link>
            <nav className="flex items-center gap-5 text-xl">
              {buttonContent}
            </nav>
          </div>
        </header>
      </>
    )

  return content
}

export default DashHeader