import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

// import { useSelector } from "react-redux"
// import { selectNoteById } from "./notesApiSlice"

import { useGetNotesQuery } from "./notesApiSlice"
import { memo } from "react"



const Note = ({ noteId }) => {
  // const note = useSelector((state) => selectNoteById(state, noteId))

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  })

  const navigate = useNavigate()

  if (note) {
    const { title, user, completed, createdAt, updatedAt } = note
    const created = new Date(createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    })

    const updated = new Date(updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    })

    const handleEdit = () => navigate(`/dash/notes/${noteId}`)

    return (
      <tr className="table__row">
        <td className="px-6 py-4 whitespace-nowrap">
          {completed ? (
            <span className="text-green-600">Completed</span>
          ) : (
            <span className="text-red-600">Open</span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{created}</td>
        <td className="px-6 py-4 whitespace-nowrap">{updated}</td>
        <td className="px-6 py-4 whitespace-nowrap">{title}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>

        <td className="px-6 py-4 whitespace-nowrap">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    )
  } else return null
}
// export default Note

const memoizedNote = memo(Note)

export default memoizedNote
