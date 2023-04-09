import { Schema, model } from 'mongoose'

export interface IUser  {
    email: string
    password: string
    name: string
    roles: string[]
    active: boolean
    comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    roles: {
        type: [String],
        required: true, // When updated data must exist!
        default: ['Employee']
    },
    active: {
        type: Boolean,
        default: true 
    }
}, {timestamps: true})

const User = model<IUser>('User', userSchema)

export default User
