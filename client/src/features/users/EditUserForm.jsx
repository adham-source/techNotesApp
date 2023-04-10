import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSave,
  faTrashCan,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons"
import ErrorMessage from "../../errors/ErrorMessage"
import { ROLES } from "../../config/roles"

const NAME_REGEX = /^[A-z]{3,20}$/
const PASSWORD_REGEX = /^[A-z0-9!@#$%]{8,30}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation()

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation()

  const navigate = useNavigate()

  const [name, setName] = useState(user.name)
  const [validName, setValidName] = useState(false)

  const [email, setEmail] = useState(user.email)
  const [validEmail, setValidEmail] = useState(false)

  const [password, setPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [roles, setRoles] = useState(user.roles)

  const [active, setActive] = useState(user.active)

  useEffect(() => {
    setValidName(NAME_REGEX.test(name))
  }, [name])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("")
      setEmail("")
      setPassword("")
      setRoles([])
      navigate("/dash/users")
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onNameChanged = (e) => setName(e.target.value)
  const onEmailChanged = (e) => setEmail(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    )
    setRoles(values)
  }

  const onActiveChanged = () => setActive((prev) => !prev)

  const onSaveUserClicked = async (e) => {
    // Check when change email
    if (password) {
      await updateUser({ id: user.id, name, email, password, roles, active })
    } else {
      await updateUser({ id: user.id, name, email, roles, active })
    }
  }

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id })
  }

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    )
  })

  let canSave
  if (password) {
    canSave =
      [roles.length, validName, validEmail, validPassword].every(Boolean) &&
      !isLoading
  } else {
    canSave = [roles.length, validName, validEmail].every(Boolean) && !isLoading
  }

  // const errClass = isError || isDelError ? "text-red-500" : "text-gray-300"
  const validNameClass = !validName
    ? "border-red-500 focus:ring-blue-300 focus:border-blue-300"
    : "border-gray-300 focus:ring-green-500 focus:border-green-500"
  const validEmailClass = !validEmail
    ? "border-red-500 focus:ring-blue-300 focus:border-blue-300"
    : "border-gray-300 focus:ring-green-500 focus:border-green-500"
  const validPasswordClass =
    password && !validPassword
      ? "border-red-500 focus:ring-blue-300 focus:border-blue-300"
      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
  const validRolesClass = !Boolean(roles.length) ? "border-red-500" : ""

  const errContent = (error?.data?.message || delerror?.data?.message) ?? ""

  const content = (
    <>
      {errContent || isError ? <ErrorMessage errorMessage={errContent} /> : ""}
      <form
        className="bg-gray-800 p-2 rounded"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">Edit User</h2>
          <div className="flex items-center space-x-2">
            <button
              className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="p-2 text-white bg-red-500 rounded hover:bg-red-600"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="username">
            Username: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className={`${validNameClass} block w-full rounded-md shadow-sm py-2 px-3 bg-gray-700 border focus:outline-none sm:text-sm`}
            id="username"
            name="name"
            type="text"
            autoComplete="off"
            value={name}
            onChange={onNameChanged}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email <span className="nowrap">(incl. @.)</span>
          </label>
          <input
            className={`${validEmailClass} block w-full rounded-md shadow-sm py-2 px-3 bg-gray-700 border focus:outline-none sm:text-sm`}
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            value={email}
            onChange={onEmailChanged}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password: <span className="nowrap">[empty = no change]</span>{" "}
            <span className="nowrap">[8-30 chars incl. !@#$%]</span>
          </label>
          <div className="relative">
            <input
              className={`${validPasswordClass} block w-full rounded-md shadow-sm py-2 px-3  bg-gray-700 border focus:outline-none sm:text-sm`}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onPasswordChanged}
            />
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              type="button"
              title="Show Password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="user-active"
            className="block text-sm font-medium mb-1"
          >
            Active:
          </label>
          <div className="flex items-center">
            <input
              id="user-active"
              name="user-active"
              type="checkbox"
              checked={active}
              onChange={onActiveChanged}
              className="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded mr-2"
            />
            <span className="text-gray-200"> {active ? "Yes" : "No"}</span>
          </div>
        </div>
        <label htmlFor="roles" className="block text-sm font-medium mb-1">
          Assigned Roles:
        </label>
        <div className="relative inline-block w-full">
          <div className="relative">
            <div
              className={`${validRolesClass} rounded-md shadow-lg w-full inline-block`}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5v.01M15 5v.01M9 9v.01M15 9v.01M9 13v.01M15 13v.01M9 17v.01M15 17v.01"
                    />
                  </svg>
                </div>
                <select
                  id="roles"
                  name="roles"
                  className="block appearance-none w-full bg-transparent py-2 pl-10 pr-3 text-white leading-tight focus:outline-none focus:bg-transparent focus:border-white sm:text-sm"
                  multiple={true}
                  size="3"
                  value={roles}
                  onChange={onRolesChanged}
                >
                  {options}
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )

  return content
}

export default EditUserForm
