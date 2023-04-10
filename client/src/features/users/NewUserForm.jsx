import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons"
import ErrorMessage from "../../errors/ErrorMessage"
import { ROLES } from "../../config/roles"

const NAME_REGEX = /^[A-z]{3,20}\s[A-z]{3,20}$/
const PASSWORD_REGEX = /^[A-z0-9!@#$%]{8,30}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation()
  const navigate = useNavigate()

  // username === name from server
  const [name, setName] = useState("")
  const [validName, setValidName] = useState(false)

  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(false)

  const [password, setPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)


  const [roles, setRoles] = useState(["Employee"])

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
     if (isSuccess) {
       setName("")
       setEmail("")
       setPassword("")
       setRoles([])
       navigate("/dash/users")
     }
   }, [isSuccess, navigate])

    const onNameChanged = (e) => setName(e.target.value)
    const onEmailChanged = (e) => setEmail(e.target.value)
    const onPasswordChanged = (e) => setPassword(e.target.value)

    const onRolesChanged = (e) => {
      const values = Array.from(
        e.target.selectedOptions, // HTMLCollection
        (option) => option.value,
      )
      setRoles(values)
    }

    const canSave =
      [roles.length, validName, validEmail, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
      e.preventDefault()
      if (canSave) {
        await addNewUser({ name, email, password, roles })
      }
    }

    const options = Object.values(ROLES).map((role) => {
      return (
        <option key={role} value={role}>
          {role}
        </option>
      )
    })

    const validNameClass = !validName
      ? "border-red-500 focus:ring-blue-300 focus:border-blue-300"
      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
    const validEmailClass = !validEmail
      ? "border-red-500 focus:ring-blue-300 focus:border-blue-300"
      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
    const validPasswordClass = !validPassword
      ? "border-red-500 focus:ring-blue-300 focus:border-blue-300"
      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
    const validRolesClass = !Boolean(roles.length) ? "border-red-500" : ""


  const content = (
    <>
      {isError ? <ErrorMessage errorMessage={error?.data.message} /> : ""}
      <form className="bg-gray-800 p-2 rounded" onSubmit={onSaveUserClicked}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">New User</h2>
          <button
            type="submit"
            className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed ${
              !canSave && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!canSave}
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            Save
          </button>
        </div>
        <label htmlFor="username" className="block text-sm font-medium mb-1">
          Username <span className="nowrap">(3-20 letters)</span>
        </label>
        <input
          id="username"
          name="name"
          type="text"
          autoComplete="off"
          value={name}
          onChange={onNameChanged}
          className={`block w-full rounded-md shadow-sm py-2 px-3 bg-gray-700 border ${validNameClass} focus:outline-none sm:text-sm`}
        />

        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email <span className="nowrap">(incl. @.)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="off"
          value={email}
          onChange={onEmailChanged}
          className={`block w-full rounded-md shadow-sm py-2 px-3 bg-gray-700 border ${validEmailClass} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        />

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password:
            <span className="nowrap">[8-30 chars incl. !@#$%]</span>
          </label>
          <div className="relative">
            <input
              className={` block w-full rounded-md shadow-sm py-2 px-3 bg-gray-700 border ${validPasswordClass} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onPasswordChanged}
            />
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              title="Show Password"
              type="button"
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

        <label htmlFor="roles" className="block text-sm font-medium mb-1">
          ASSIGNED ROLES
        </label>
        <select
          id="roles"
          name="roles"
          className={`block w-full rounded-md shadow-sm py-2 px-3 border bg-gray-700 ${validRolesClass} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          multiple
          size={3}
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </form>
    </>
  )


  return content
}

export default NewUserForm
