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
      <a href="tel:+0201280520100" className="text-blue-300 hover:text-blue-400">
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
