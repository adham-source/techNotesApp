import { useEffect } from "react"

const useTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title
    // Clean hook functions
    return () => (document.title = prevTitle)
  }, [title])
}

export default useTitle
