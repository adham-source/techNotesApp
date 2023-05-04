import { Suspense, lazy } from "react"
import { useGetUsersQuery } from "./usersApiSlice"
import { PulseLoader } from "react-spinners"
const User = lazy(() => import("./User"))
const ErrorMessage = lazy(() => import("../../errors/ErrorMessage"))

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    // pollingInterval: 60000,
    // refetchOnFocus: false,
    // refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) content = <PulseLoader color="#FFF" />

  if (isError) {
    content = (
      <Suspense fallback={<PulseLoader color="#FFF" />}>
        <ErrorMessage errorMessage={error?.data?.message} />
      </Suspense>
    )
  }
  if (isSuccess) {
    const { ids } = users

    const tableContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />)

    content = (
      <div className="overflow-x-auto">
        <div className="container mx-auto space-y-4 py-5">
          <table className="w-full table-auto bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 uppercase">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-gray-600 uppercase">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-gray-600 uppercase">
                  Roles
                </th>
                <th className="px-4 py-2 text-left text-gray-600 uppercase">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </table>
        </div>
      </div>
    )
  }

  return content
}

export default UsersList
