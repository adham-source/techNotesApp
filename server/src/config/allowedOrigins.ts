import keys from "./keys"

const { DOMINE_URL } = keys

const allowedOrigins: string[] = [
    DOMINE_URL,
    "http://localhost:5173"
]

export default allowedOrigins