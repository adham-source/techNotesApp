import { format } from 'date-fns'
import { NextFunction, Request, Response } from 'express'
import { existsSync } from 'fs'
import { appendFile, mkdir } from 'fs/promises'
import path from 'path'

export const logEvents = async(message: string, logFileName: string) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${crypto.randomUUID()}\t${message}`
    try {
        if(!existsSync(path.join(__dirname, '..', '..', 'logs'))) {
            await mkdir(path.join(__dirname, '..', '..', 'logs'))
        }
        await appendFile(path.join(__dirname, '..', '..', 'logs', logFileName), logItem)
    } catch (error) {
     console.error(error)   
    }
}

const logger = (req: Request, res: Response, next: NextFunction): void => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}\n`, 'reqLog.log')
    console.info(req.method, req.path)
    next()
}

export default logger