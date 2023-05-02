import { Suspense, lazy } from "react"
import { useParams } from "react-router-dom"
import { useGetNotesQuery } from "./notesApiSlice"
import { useGetUsersQuery } from "../users/usersApiSlice"
import useAuth from "../../hooks/useAuth"
import PulseLoader from "react-spinners/PulseLoader"
import useTitle from "../../hooks/useTitle"

const EditNoteForm = lazy(() => import("./EditNoteForm"))
const ErrorMessage = lazy(() => import("../../errors/ErrorMessage"))

const EditNote = () => {
  useTitle("techNotes: Edit Note")

  const { id } = useParams()
  const { email, isManager, isAdmin } = useAuth()

  // const note = useSelector((state) => selectNoteById(state, id))
  // const users = useSelector(selectAllUsers)

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  })

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  })

  if (!note || !users?.length) return <PulseLoader color={"#FFF"} />

  if (!isManager && !isAdmin) {
    if (note?.user.email !== email) {
      return (
        <Suspense fallback={<PulseLoader color="#FFF" />}>
          <ErrorMessage errorMessage={"No access"} />
        </Suspense>
      )
    }
  }

  const content = (
    <Suspense fallback={<PulseLoader color="#FFF" />}>
      <EditNoteForm note={note} users={users} />
    </Suspense>
  )
  

  return content
}
export default EditNote
