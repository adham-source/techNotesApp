import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
const Spinner = () => {
  const content = (
    <div className="flex items-center justify-center h-full">
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        className="text-gray-700 text-8xl sm:text-9xl lg:text-10xl"
      />
    </div>
  )
  return content
}

export default Spinner
