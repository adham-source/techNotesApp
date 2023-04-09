const { PORT, HOST_URL, MONGO_URI, DOMINE_URL, SALT_ROUNDS, SECRET_HASH_PASSWORD, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

type Keys = {
    PORT: number,
    HOST_URL: string,
    MONGO_URI: string,
    DOMINE_URL: string,
    SALT_ROUNDS: number,
    SECRET_HASH_PASSWORD: string,
    ACCESS_TOKEN_SECRET: string,
    REFRESH_TOKEN_SECRET: string
}

const keys: Keys = {
    PORT: Number(PORT) as number,
    HOST_URL: HOST_URL as string,
    MONGO_URI: MONGO_URI as string,
    DOMINE_URL: DOMINE_URL as string,
    SALT_ROUNDS: Number(SALT_ROUNDS) as number,
    SECRET_HASH_PASSWORD: SECRET_HASH_PASSWORD as string,
    ACCESS_TOKEN_SECRET: ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET: REFRESH_TOKEN_SECRET as string
}


export default keys