
import { useGetUsersQuery } from "../users/usersApiSlice"

import PulseLoader from "react-spinners/PulseLoader"
import useTitle from "../../hooks/useTitle"
import { Suspense, lazy } from "react"

const NewNoteForm = lazy(() => import("./NewNoteForm"))

const NewNote = () => {
   useTitle("techNotes: New Note")

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  })

  if (!users?.length) return <PulseLoader color={"#FFF"} />

  const content = (
    <Suspense fallback={<PulseLoader color="#FFF" />}>
      <NewNoteForm users={users} />
    </Suspense>
  )
  
  return content
}
export default NewNote
