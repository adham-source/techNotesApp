import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

import { useGetUsersQuery } from "./usersApiSlice"
import { memo } from "react"

const User = ({ userId }) => {

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  })
  const navigate = useNavigate()
  if (user) {
    const { name, email, roles, active } = user
    const handleEdit = () => navigate(`/dash/users/${userId}`)

    const userRolesString = roles.toString().replaceAll(",", ", ")
    const cellStatus = active
      ? "bg-gray-800 text-white"
      : "bg-gray-700 text-gray-200"

    return (
      <tr className="border-t border-gray-600">
        <td className={`px-4 py-3 ${cellStatus}`}>{name}</td>
        <td className={`px-4 py-3 ${cellStatus}`}>{email}</td>
        <td className={`px-4 py-3 ${cellStatus}`}>{userRolesString}</td>
        <td className={`px-4 py-3 ${cellStatus}`}>
          <button
            className="text-gray-300 hover:text-gray-100"
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    )
  } else {
    return null
  }
}

const memoizedUser = memo(User)

export default memoizedUser
// export default User
