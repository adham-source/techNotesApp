import { useState, useEffect, useMemo } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"
import UserSelectOptions from "../../components/UserSelectOptions"
import { PulseLoader } from "react-spinners"

const EditNoteForm = ({ note, users }) => {
  const { userID, isManager, isAdmin } = useAuth()
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation()

  const [
    deleteNote,
    {
      isSuccess: isDelSuccess,
      isError: isDelError,
      isLoading: isDelLoading,
      error: delerror,
    },
  ] = useDeleteNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState(note.title)
  const [text, setText] = useState(note.text)
  const [completed, setCompleted] = useState(note.completed)
  const [userId, setUserId] = useState(note.user._id)

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("")
      setText("")
      setUserId("")
      navigate("/dash/notes")
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onTextChanged = (e) => setText(e.target.value)
  const onCompletedChanged = (e) => setCompleted((prev) => !prev)
  const onUserIdChanged = (e) => setUserId(e.target.value)

  // If use this line `Form submission canceled because the form is not connected`
  // if (isLoading || isDelLoading) return <PulseLoader color={"#FFF"} />

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async (e) => {
    if (canSave) {
      await updateNote({ id: note.id, user: userId, title, text, completed })
    }
  }

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id })
  }

  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })
  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })

  const options = (
    <UserSelectOptions
      users={users}
      isAdmin={isAdmin}
      isManager={isManager}
      ID={userID}
    />
  )

  const errClass = isError || isDelError ? "text-red-500" : "text-white"
  const validTitleClass = !title ? "border-red-500" : "border-green-500"
  const validTextClass = !text ? "border-red-500" : "border-green-500"

  const errContent = (error?.data?.message || delerror?.data?.message) ?? ""

  let deleteButton = null
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className="p-2 text-white bg-red-500 rounded hover:bg-red-600"
        title="Delete"
        onClick={onDeleteNoteClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    )
  }
  const content = (
    <>
      <div className={`${errClass} w-full py-4 px-6`}>
        <p>{errContent}</p>
      </div>

      <form
        className="bg-gray-800 p-2 rounded"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">Edit Note #{note.ticket}</h2>
          <div className="flex items-center space-x-2">
            <button
              className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
              title="Save"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {deleteButton}
          </div>
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
        <div className="">
          <div className="">
            <label className="" htmlFor="note-completed">
              WORK COMPLETE:
              <input
                className=""
                id="note-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompletedChanged}
              />
            </label>

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
          </div>
          <div className="">
            <p className="">
              Created:
              <br />
              {created}
            </p>
            <p className="">
              Updated:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  )

  return content
}

export default EditNoteForm
