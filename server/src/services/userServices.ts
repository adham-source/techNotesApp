import { isValidObjectId } from "mongoose"
import { boolean, object, string, array } from "zod"

class UserServices {

    private readonly createUser = {
        body: object({
            email: string({
                required_error: "Email is required."
            }).email().trim(),
            password: string({
                required_error: "Password is required."
            }).trim().min(8, 'Password must contain at least 8 character(s)'),
            name: string({
                required_error: "Name is required."
            }).trim().min(3, 'Name must contain at least 8 character(s)'),
            roles: array(string()).nonempty().default(['Employee']),
            active: boolean().default(true)
        }).strict()
    }

    private readonly updateUser = {
        body: object({
            id: string({
                required_error: "User ID is required."
            }).trim().refine((value) => isValidObjectId(value), 'Invalid Id'),
            email: string({
                required_error: "Email is required."
            }).email().trim(),
            password: string().trim().min(8, 'Password must contain at least 8 character(s)').optional(),
            name: string({
                required_error: "Name is required."
            }).trim().min(3, 'Name must contain at least 3 character(s)'),
            roles: array(string()).nonempty().default(['Employee']),
            active: boolean().default(true)
        }).strict()
    }

    private readonly deleteUser = {
        body: object({
            id: string({
                required_error: "User ID is required."
            }).trim().refine((value) => isValidObjectId(value), 'Invalid Id')
        }).strict()
    }

    private readonly params = {
        params: object({
            id: string().trim().refine((value) => isValidObjectId(value), 'Invalid Id'),
        }),
    }

    public createUserSchema = object({
        ...this.createUser
    })

    public getUserSchema = object({
        ...this.params
    }) 

    public updateUserSchema = object({
        ...this.updateUser
    })
    
    public deleteUserSchema = object({
        ...this.deleteUser
    })
}

const userServices = new UserServices()
export default userServices