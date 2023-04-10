import { useMemo } from 'react'

const UserSelectOptions = ({ users, isAdmin, isManager, ID }) => {
  const filteredUsers = useMemo(() => {
    if (isAdmin || isManager) {
      return users
    }
    return users.filter((user) => user.id.toString() === ID)
  }, [users, isAdmin, isManager, ID])

  const options = useMemo(
    () =>
      filteredUsers.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name} - {user.email}
        </option>
      )),
    [filteredUsers],
  )

  return options
}

export default UserSelectOptions