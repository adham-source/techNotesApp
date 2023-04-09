import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/User'
import CustomErrors from '../services/customErrors'
import bcryptUtlis from '../utils/bcrypt'
import Note from '../models/Note'

const { hashPassword } = bcryptUtlis

class UserControllers {
    /**
     * @desc Get all users
     * @route GET /api/v1/users
     * @access Private
     */

    getUsers = expressAsyncHandler (async (req: Request, res: Response): Promise<void> => {
        const users = await User.find().select('-password').lean()
        if (users.length === 0) {
            throw new CustomErrors(404, "No users found");
        }
        res.json({
            success: true,
            users
        })
    })

    /**
     * @desc Create a new user
     * @route POST /api/v1/users
     * @access Public
     */

    createUser = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        
        const { email, password, name } = req.body
        
        const duplicate = await User.findOne({ email }).lean().exec()
        if(duplicate) throw new CustomErrors(409, 'Duplicate email')

        const hashedPassword = await hashPassword(password)
        const userData = { ...req.body, password: hashedPassword }

        const user = await User.create(userData)

        if(!user) throw new CustomErrors(400, 'Invalid user data recived')
        

        res.status(201).json({
            success: true,
            message: `New user ${name} created`
        })
        
    })  

    /**
     * @desc Update a user
     * @route PATCH /api/v1/users
     * @access Private
     */

    updateUser = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { id, name, email, roles, active, password } = req.body

        const user = await User.findById(id).exec()

        if(!user) {
            throw new CustomErrors(400, "User not found.")
        }

        // Check for duplicate 
        // .collation({  locale: 'en' , strngth: 2}).lean().exec() try and test any duplicate
        const duplicate = await User.findOne({ email }).lean().exec()

        // Allow updates to the original user
        if(duplicate && duplicate._id.toString() !== id) {
            throw new CustomErrors(409, "Duplicate email")
        }

        user.name = name
        user.email = email
        user.active = active

        if(roles) {
            user.roles = roles
        }

        if(password) {
            // Hash password
            user.password = await hashPassword(password)
        }

        const updatedUser = await user.save()
        res.json({
            success: true,
            message: `${updatedUser.name} updated`
        })
    })

    /**
     * @desc Delete a user
     * @route DELETE /api/v1/users
     * @access Private
     */

    deleteUser = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { id } = req.body
        
        const hasNotes = await Note.findOne({ user: id }).lean().exec()
        if (hasNotes) {
            throw new CustomErrors(400, "User has assigned notes")
        }

        const user = await User.findById(id).exec()
        if(!user) {
            throw new CustomErrors(400, "User not found")
        }

        const result = await user.deleteOne()

        const message = `User ${result.name} with ID ${result._id} deleted`
        
        res.json({
            success: true,
            message
        })
    })


}


const userControllers = new UserControllers()

export default userControllers