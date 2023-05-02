import { Suspense, lazy } from "react"
import { useParams } from "react-router-dom"
import { useGetUsersQuery } from "./usersApiSlice"
import PulseLoader from "react-spinners/PulseLoader" // Instead of spinner

const EditUserForm = lazy(() => import("./EditUserForm"))

const EditUser = () => {
  const { id } = useParams()
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  })

  if (!user) return <PulseLoader color={"#FFF"} />

  // const content = user ? <EditUserForm user={user} /> : <Spinner />

  const content = (
    <Suspense fallback={<PulseLoader color="#FFF" />}>
      <EditUserForm user={user} />
    </Suspense>
  )
  
  return content
}

export default EditUser
