import { isValidObjectId } from "mongoose"
import { boolean, object, string, array } from "zod"

class AuthServices {

    private readonly login = {
        body: object({
            email: string({
                required_error: "Email is required."
            }).email().trim(),
            password: string({
                required_error: "Password is required."
            }).trim(),
        }).strict()
    }

    public loginAuthSchema = object({
        ...this.login
    })

}

const authServices = new AuthServices()
export default authServices