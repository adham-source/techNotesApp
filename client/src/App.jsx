import { lazy } from "react"
import { Routes, Route } from "react-router-dom"

// import Layout from "./layouts/Layout"
// import Public from "./layouts/Public"
// import Login from "./features/auth/Login"
// import DashLayout from "./layouts/DashLayout"
// import Welcome from "./features/auth/Welcome"
const Layout = lazy(() => import("./layouts/Layout"))
const Public = lazy(() => import("./layouts/Public"))
const Login = lazy(() => import("./features/auth/Login"))
const DashLayout = lazy(() => import("./layouts/DashLayout"))
const Welcome = lazy(() => import("./features/auth/Welcome"))

// import UsersList from "./features/users/UsersList"
// import EditUser from "./features/users/EditUser"
// import NewUserForm from "./features/users/NewUserForm"

const UsersList = lazy(() => import("./features/users/UsersList"))
const EditUser = lazy(() => import("./features/users/EditUser"))
const NewUserForm = lazy(() => import("./features/users/NewUserForm"))

// import NotesList from "./features/notes/NotesList"
// import EditNote from "./features/notes/EditNote"
// import NewNote from "./features/notes/NewNote"

const NotesList = lazy(() => import("./features/notes/NotesList"))
const EditNote = lazy(() => import("./features/notes/EditNote"))
const NewNote = lazy(() => import("./features/notes/NewNote"))

// import Prefetch from "./features/auth/Prefetch"
// import PersistLogin from "./features/auth/PersistLogin"
// import RequireAuth from "./features/auth/RequireAuth"

const Prefetch = lazy(() => import("./features/auth/Prefetch"))
const PersistLogin = lazy(() => import("./features/auth/PersistLogin"))
const RequireAuth = lazy(() => import("./features/auth/RequireAuth"))

import { ROLES } from "./config/roles"
import useTitle from "./hooks/useTitle"

export default function App() {
  useTitle("Adham .A Repairs")
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* Protected */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
              {/* End Dashboard */}
            </Route>
            {/* End Prefetch */}
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
