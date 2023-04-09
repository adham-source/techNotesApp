import express, { Application, Request, Response } from 'express'
import dbConnect from './config/dbConnect'
import keys from './config/keys'
import path from 'path'
import routes from './routes'
import logger, { logEvents } from './middlewares/logger'
import errorHandler from './middlewares/errorHandler'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import corsOptions from './config/corsOptions'
import mongoose from 'mongoose'

const app: Application = express()

const { PORT, HOST_URL, MONGO_URI } = keys

const hostUrl: string = HOST_URL 
const port: Number = 4500 || PORT

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())
app.use(helmet())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "..", "public")))
app.set('view engine', 'pug')

app.use(routes)
app.all("*", (_req: Request, res: Response): void => {
    
    res.status(404).render('404', { 
        title: "404 Not Found",
        message: "The resource you have requested does not exist."
    })
    
})

const start = async (): Promise<void> => {
    try {
        await dbConnect(MONGO_URI as string)
        console.info(`Connected to MongoDB`)
        app.listen(port, (): void => console.info(`Server is running on : ${hostUrl}:${port}`))
    } catch {
        console.error('Something was wrong!')
    }
}

mongoose.connection.on('error', err => {
    logEvents(`${err.on}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

app.use(errorHandler)

start()

export default app