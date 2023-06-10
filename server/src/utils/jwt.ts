import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import keys from '../config/keys'
import { Types } from 'mongoose'
import CustomErrors from '../services/customErrors'

interface Payload {
    userId?: string, name?: string, email?: string, roles?: string[], store?: Types.ObjectId
}

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = keys

class JwtUtils {
    generateAccessToken(UserInfo: Payload): string { // Adding id only `Fetch data from DB`
        const payload: Payload = { ...UserInfo }
        const options: SignOptions = { expiresIn: '15s' }
        return jwt.sign(payload, ACCESS_TOKEN_SECRET as string, options)
    }

    generateRefreshToken(userId: string, name: string): string {
        const payload: Payload = { userId, name }
        const options: SignOptions = { expiresIn: '7d' }
        return jwt.sign(payload, REFRESH_TOKEN_SECRET as string, options)
    }

    verifyAccessToken(token: string) {
        try {
            const decoded: string | JwtPayload = jwt.verify(token, ACCESS_TOKEN_SECRET as string) as JwtPayload
            return decoded
        } catch {
            throw new CustomErrors(403, 'Forbidden')
        }

    }
    verifyRefreshToken(token: string): JwtPayload {
        try {
            const decoded: string | JwtPayload = jwt.verify(token, REFRESH_TOKEN_SECRET as string) as JwtPayload
            return decoded
        } catch (error) {
            throw new CustomErrors(403, 'Forbidden')
        }
    }
}
const jwtUtils = new JwtUtils()
export default jwtUtils 