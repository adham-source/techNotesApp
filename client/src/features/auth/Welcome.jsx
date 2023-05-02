import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"

const Welcome = () => {
  const { name, email, isManager, isAdmin } = useAuth()
  useTitle(`techNotes: ${name} - ${email}`)
  const date = new Date()
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date)

  return (
    <section className="bg-gray-900 text-white py-3 sm:py-6 lg:py-12">
      <div className="container mx-auto space-y-4">
        <p className="text-lg xl:text-2xl">{today}</p>
        <h1 className="text-4xl xl:text-6xl">Welcome {name}!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LinkCard to="/dash/notes" title="View techNotes" />
          <LinkCard to="/dash/notes/new" title="Add New techNote" />
          {(isManager || isAdmin) && (
            <LinkCard to="/dash/users" title="View User Settings" />
          )}
          {(isManager || isAdmin) && (
            <LinkCard to="/dash/users/new" title="Add New User" />
          )}
        </div>
      </div>
    </section>
  )
}

const LinkCard = ({ to, title }) => {
  return (
    <div className="bg-gray-800 rounded-lg hover:bg-gray-700 ease-in-out transition-all duration-100 cursor-pointer">
      <Link to={to} className="block text-lg xl:text-2xl p-4">
        {title}
      </Link>
    </div>
  )
}

export default Welcome
