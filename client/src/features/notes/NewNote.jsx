import { useSelector } from "react-redux"
// import { selectAllUsers } from "../users/usersApiSlice"
import { useGetUsersQuery } from "../users/usersApiSlice"

import NewNoteForm from "./NewNoteForm"
// import ErrorMessage from "../../errors/ErrorMessage"
import PulseLoader from "react-spinners/PulseLoader"

const NewNote = () => {
  // const users = useSelector(selectAllUsers)
  // if (!users?.length)
  //   return <ErrorMessage errorMessage={"Not Currently Available"} />

  // const content = <NewNoteForm users={users} />

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  })

  if (!users?.length) return <PulseLoader color={"#FFF"} />

  const content = <NewNoteForm users={users} />
  return content
}
export default NewNote
