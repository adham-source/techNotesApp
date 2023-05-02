import { PulseLoader } from "react-spinners"
import { store } from "../../app/store"
import { notesApiSlice } from "../notes/notesApiSlice"
import { usersApiSlice } from "../users/usersApiSlice"
import { Suspense, useEffect } from "react"
import { Outlet } from "react-router-dom"

const Prefetch = () => {
   useEffect(() => {
     store.dispatch(
       notesApiSlice.util.prefetch("getNotes", "notesList", { force: true }),
     )
     store.dispatch(
       usersApiSlice.util.prefetch("getUsers", "usersList", { force: true }),
     )
   }, [])

  return (
    <Suspense fallback={<PulseLoader color="#FFF" />}>
      <Outlet />
    </Suspense>
  )
}
export default Prefetch
