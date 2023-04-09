import { Request, Response } from "express"
import expressAsyncHandler from "express-async-handler"
import User from "../models/User"
import CustomErrors from "../services/customErrors"
import bcryptUtlis from "../utils/bcrypt"
import jwt, { JwtPayload } from 'jsonwebtoken'
import keys from "../config/keys"
import jwtUtils from "../utils/jwt"

const { comparePassword } = bcryptUtlis
const { ACCESS_TOKEN_SECRET ,REFRESH_TOKEN_SECRET } = keys
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = jwtUtils

class AuthControllers {
    /**
        * @desc Login
        * @route POST /api/v1/auth
        * @access Public
    */
    login = expressAsyncHandler(async(req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body

        const user = await User.findOne({email}).exec()

        if(!user || !user.active) {
            throw new CustomErrors(401, "Invalid email or password")
        }

        const isMatch = await comparePassword(password, user.password)
        if(!isMatch) {
            throw new CustomErrors(401, "Invalid email or password")
        }

        // // Refactoring this code into separate file and functions ?!
        // const accessToken = jwt.sign(
        //     {
        //         "UserInfo": {
        //             "name": user.name,
        //             "email": user.email,
        //             "roles": user.roles
        //         }
        //     },
        //     ACCESS_TOKEN_SECRET,
        //     { expiresIn: '15m' }
        // )

        // const refreshToken = jwt.sign(
        //     // Using name but username in project is unique change after testing (email || _id)
        //     { "id": user._id, "name": user.name },
        //     REFRESH_TOKEN_SECRET,
        //     { expiresIn: '7d' }
        // )

        const accessToken: string = generateAccessToken({
            name: user.name,
            email: user.email,
            roles: user.roles
        })

        const refreshToken: string = generateRefreshToken(user._id.toString(), user.name)

        

        // Create secure cookie with refresh token 
        res.cookie('jwt', refreshToken, {
            httpOnly: true, // accessible only by web server 
            secure: true, // https
            sameSite: 'none', // cross-site cookie 
            maxAge: 7 * 24 * 60 * 60 * 1000 // cookie expiry: set to match refresh token 
        })

        // Send accessToken containing userId, name, email and roles 
        res.json({ success: true, accessToken })

    })

    /**
        * @desc Refresh Token
        * @route GET /api/v1/auth/refresh
        * @access Public - because access token has expired.
    */
    refresh = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const cookies = req.cookies

        if (!cookies?.jwt) {
            throw new CustomErrors(401, "Unauthorized")
        }

        const refreshToken = cookies.jwt
        const decoded = verifyRefreshToken(refreshToken)
        const user = await User.findOne({ name: decoded.name, _id: decoded.userId }).exec();
        if (!user) {
            throw new CustomErrors(401, 'Unauthorized');
        }

        const accessToken: string = generateAccessToken({
            userId: user._id.toString(),
            name: user.name,
            email: user.email,
            roles: user.roles
        })
        res.json({ success: true, accessToken })

        // jwt.verify(
        //     refreshToken,
        //     REFRESH_TOKEN_SECRET,
        //     expressAsyncHandler(async (err: Error, decoded: JwtPayload): Promise<void> => {
        //         if (err) {
        //             throw new CustomErrors(403, 'Forbidden')
        //         }
        //         const user = await User.findOne({ name: decoded.name, _id: decoded.id }).exec();

        //         if (!user) {
        //             throw new CustomErrors(401, 'Unauthorized');
        //         }
        //         const accessToken = jwt.sign(
        //             {
        //                 UserInfo: {
        //                     name: user.name,
        //                     email: user.email,
        //                     roles: user.roles,
        //                 },
        //             },
        //             ACCESS_TOKEN_SECRET,
        //             { expiresIn: '15m' },
        //         );

        //         res.json({ accessToken });
        //     }),
        // );
    })

    /**
        * @desc Logout
        * @route POST /api/v1/auth/logout
        * @access Public  - just to clear cookie if exists
    */
    logout = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const cookies = req.cookies
        if (!cookies?.jwt) {
            res.sendStatus(204) // No content
            return 
        }
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
        res.json({ success: true, message: 'Cookie cleared' })
    })
}

const authControllers = new AuthControllers()

export default authControllers