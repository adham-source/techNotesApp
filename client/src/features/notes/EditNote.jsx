import { useParams } from "react-router-dom"
// import { useSelector } from "react-redux"
// import { selectNoteById } from "./notesApiSlice"
// import { selectAllUsers } from "../users/usersApiSlice"
// import Spinner from "../../components/Spinner"

import { useGetNotesQuery } from "./notesApiSlice"
import { useGetUsersQuery } from "../users/usersApiSlice"
import useAuth from "../../hooks/useAuth"
import PulseLoader from "react-spinners/PulseLoader"
import EditNoteForm from "./EditNoteForm"
import ErrorMessage from "../../errors/ErrorMessage"

const EditNote = () => {
  const { id } = useParams()
  const { name, email, isManager, isAdmin } = useAuth()

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

  // const content =
  //   note && users ? (
  //     <EditNoteForm note={note} users={users} />
  //   ) : (
  //     <Spinner />
  //   )

  if (!note || !users?.length) return <PulseLoader color={"#FFF"} />

  if (!isManager && !isAdmin) {
    // What mean?
    if (note.email !== email) {
      return <ErrorMessage errorMessage={"No access"} />
    }
  }

  const content = <EditNoteForm note={note} users={users} />

  return content
}
export default EditNote
