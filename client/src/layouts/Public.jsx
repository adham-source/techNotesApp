import { Link } from "react-router-dom"

const Public = () => {
  return (
    <section className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="py-5 px-2 flex-grow">
        <div className="container mx-auto">
          <p className="text-lg md:text-xl">
            Located in Beautiful Downtown Foo City, Adham A. Repairs provides a
            trained staff ready to meet your tech repair needs.
          </p>
          <Address />
          <Owner />
        </div>
      </main>
      <Footer />
    </section>
  )
}

const Header = () => {
  return (
    <header className="bg-gray-700 px-2 border-b py-3">
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-4xl">
          Welcome to <span className="font-bold">Adham A. Repairs!</span>
        </h1>
      </div>
    </header>
  )
}

const Address = () => {
  return (
    <address className="text-lg md:text-xl">
      Adham A. Repairs
      <br />
      555 Foo Drive
      <br />
      Foo City, CA 12345
      <br />
      <a href="tel:00201280520100" className="text-blue-300 hover:text-blue-400">
        (+02) 01280520100
      </a>
    </address>
  )
}

const Owner = () => {
  return <p className="text-lg md:text-xl">Owner: Adham Ahmad</p>
}

const Footer = () => {
  return (
    <footer className="bg-gray-700 px-2 border-t py-3 mt-auto">
      <div className="container mx-auto">
        <Link
          to="/login"
          className="text-lg md:text-xl text-blue-300 hover:text-blue-400 transition-colors duration-300 ease-in-out"
        >
          Employee Login
        </Link>
      </div>
    </footer>
  )
}

export default Public
// 
// import React from "react"
// import logo from "./logo.png" // Import your logo image
// import "./App.css" // Import your custom styles or Tailwind CSS classes

// const Public = () => {
// return (
//   <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//     <div className="max-w-md w-full bg-gray-800 shadow-lg rounded-lg p-8">
//       <div className="text-center">
//         {/* <img
//           src={logo}
//           alt="TechNotes Logo"
//           className="w-32 h-32 mx-auto mb-8"
//         />{" "} */}
//         {/* Render your logo */}
//         <h1 className="text-4xl font-bold text-white mb-4">TechNotes</h1>{" "}
//         {/* Heading */}
//         <p className="text-lg text-gray-400 mb-8">
//           Efficient and Secure Note-Taking for Your Workplace
//         </p>{" "}
//         {/* Description */}
//       </div>
//       <div>
//         <h2 className="text-2xl font-bold text-white mb-4">
//           Streamline Your Workflow with TechNotes
//         </h2>{" "}
//         {/* Subheading */}
//         <p className="text-gray-400 mb-4">
//           TechNotes is the ultimate web app for note-taking in the workplace.
//           With powerful features tailored for employees, admins, and managers,
//           TechNotes helps you keep track of important information, collaborate
//           with your team, and stay organized all in one place.
//         </p>
//         <ul className="list-disc list-inside mb-4">
//           <li className="text-gray-400 mb-2">
//             Create and manage your own notes with reminders
//           </li>
//           <li className="text-gray-400 mb-2">
//             Collaborate with team members on shared notes in real-time
//           </li>
//           <li className="text-gray-400 mb-2">
//             Manage user accounts and set access permissions as an admin
//           </li>
//           <li className="text-gray-400 mb-2">
//             Assign tasks, set deadlines, and track progress as a manager
//           </li>
//           <li className="text-gray-400 mb-2">
//             Robust encryption measures and role-based access controls for
//             security
//           </li>
//         </ul>
//         <p className="text-gray-400 mb-8">
//           TechNotes is designed to enhance productivity and communication in
//           your workplace. Join now and revolutionize how you take and manage
//           notes!
//         </p>
//         <div className="flex justify-center">
//           <a
//             href="/signup"
//             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition duration-200"
//           >
//             Sign Up Now
//           </a>{" "}
//           {/* Render a sign-up button */}
//         </div>
//       </div>
//     </div>
//   </div>
// )
// }

// export default Public

