import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'
const validate =
    (schema: AnyZodObject) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await schema.parseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params
                })
                return next()
            } catch (error) {
                if (error instanceof ZodError) {
                    const errors = error.issues.map(error => error.message)
                    return res.status(400).json({ success: false, errors })
                }

            }
        }
export default validate