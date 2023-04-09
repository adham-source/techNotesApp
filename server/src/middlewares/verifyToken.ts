import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import CustomErrors from "../services/customErrors";
import jwtUtils from "../utils/jwt";

const { verifyAccessToken } = jwtUtils;

declare global {
    namespace Express {
        interface Request {
            user?: { userId: string, name: string, roles: string[] };
        }
    }
}

export const verifyToken = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization as string || req.headers.Authorization as string;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new CustomErrors(401, "Unauthorized")
    }

    const token: string = authHeader.split(' ')[1]

    if (!token) {
        throw new CustomErrors(403, "Forbidden")
    }

    const decoded = verifyAccessToken(token)

    console.log(decoded, "DECODED")

    req.user = {
        userId: decoded._id,
        name: decoded.name,
        roles: decoded.roles
    };

    next()
})
