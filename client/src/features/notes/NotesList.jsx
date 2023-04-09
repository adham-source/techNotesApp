import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
import Spinner from "../../components/Spinner"
import ErrorMessage from "../../errors/ErrorMessage"
import useAuth from "../../hooks/useAuth"

const NotesList = () => {
  const { name, email, isManager, isAdmin } = useAuth()
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) content = (<Spinner />)

  if (isError) {
    content = <ErrorMessage errorMessage={error?.data?.message} />
  }

  if (isSuccess) {
    const { ids, entities } = notes
    
    let filteredIds
    if (isManager || isAdmin) {
      filteredIds = [...ids]
    } else {
      
      filteredIds = ids.filter(
        (noteId) => entities[noteId].user.email === email,
      )      
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />)

    content = (
      <div className="container mx-auto overflow-x-auto">
        <table className="w-full table-auto bg-gray-800 rounded-lg overflow-hidden">
          <thead className="text-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Created
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Updated
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Owner
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-700 divide-y divide-gray-600">
            {tableContent}
          </tbody>
        </table>
      </div>
    )
  }

  return content
}
export default NotesList