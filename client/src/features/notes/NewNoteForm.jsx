import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"
import ErrorMessage from "../../errors/ErrorMessage"
import useAuth from "../../hooks/useAuth"
import UserSelectOptions from "../../components/UserSelectOptions"

const NewtNoteForm = ({ users }) => {
  const { userID, isAdmin, isManager } = useAuth()
 
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [userId, setUserId] = useState(userID)

  useEffect(() => {
    if (isSuccess) {
      setTitle("")
      setText("")
      setUserId("")
      navigate("/dash/notes")
    }
  }, [isSuccess, navigate])

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onTextChanged = (e) => setText(e.target.value)
  const onUserIdChanged = (e) => setUserId(e.target.value)

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewNote({ user: userId, title, text })
    }
  }

   const options = (
     <UserSelectOptions
       users={users}
       isAdmin={isAdmin}
       isManager={isManager}
       ID={userID}
     />
   )

  const validTitleClass = !title ? "border-red-500" : ""
  const validTextClass = !text ? "border-red-500" : ""

  const content = (
    <>
      {isError ? <ErrorMessage errorMessage={error?.data?.message} />: ""} 
      <form className="bg-gray-800 p-2 rounded" onSubmit={onSaveNoteClicked}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">New Note</h2>
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
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title: <span className="nowrap"></span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
          className={`block w-full rounded-md shadow-sm py-2 px-3 bg-gray-700 border ${validTitleClass} focus:outline-none sm:text-sm`}
        />

        <label htmlFor="text" className="block text-sm font-medium mb-1">
          Text: <span className="nowrap"></span>
        </label>
        <input
          id="text"
          name="text"
          type="text"
          autoComplete="off"
          value={text}
          onChange={onTextChanged}
          className={`block w-full rounded-md shadow-sm py-2 px-3 bg-gray-700 border ${validTextClass} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
        />

        <label htmlFor="name" className="block text-sm font-medium mb-1">
          ASSIGNED TO:
        </label>
        <select
          id="name"
          name="info"
          className={`block w-full rounded-md shadow-sm py-2 px-3 border bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
      </form>
    </>
  )

  return content
}

export default NewtNoteForm
