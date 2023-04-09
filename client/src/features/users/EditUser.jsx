import { useParams } from "react-router-dom"
// import { useSelector } from "react-redux"
// import { selectUserById } from "./usersApiSlice"
import EditUserForm from "./EditUserForm"
// import Spinner from "../../components/Spinner"

import { useGetUsersQuery } from "./usersApiSlice"
import PulseLoader from "react-spinners/PulseLoader" // Instead of spinner

const EditUser = () => {
  const { id } = useParams()

  // const user = useSelector((state) => selectUserById(state, id))

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  })

  if (!user) return <PulseLoader color={"#FFF"} />

  // const content = user ? <EditUserForm user={user} /> : <Spinner />

  const content = <EditUserForm user={user} />
  return content
}

export default EditUser
