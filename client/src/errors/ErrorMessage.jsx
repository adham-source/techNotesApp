import { useState } from "react"

const ErrorMessage = ({ errorMessage }) => {
  const [close, setClose] = useState(true)

  const handleClose = () => {
    setClose(!close)
  }

  return (
    <div className={close ? "container mx-auto my-3" : "hidden"}>
      <p className="text-red-500 text-center py-4 bg-red-100 rounded-md shadow-md">
        <svg
          onClick={handleClose}
          className="inline-block h-6 w-6 mr-2 stroke-current text-red-600 cursor-pointer"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
        {/* <span>Error:</span> */}
        <span className="ml-1">{errorMessage}</span>
      </p>
    </div>
  )
}

export default ErrorMessage