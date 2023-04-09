import { NextFunction, Request, Response } from 'express'
import { logEvents } from './logger'
import CustomErrors from '../services/customErrors';


const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}\n`, 'errLog.log')


    if (err instanceof CustomErrors) {
        res.status(err.status).json({ success: false, message: err.message })
        return 
    } 
    const status = res.statusCode ? res.statusCode : 500

    res.status(status)

    // Whay add isError
    res.json({success: false, message: err.message, isError: true})
}

export default errorHandler