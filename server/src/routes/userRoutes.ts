import { Router } from "express"
import userControllers  from '../controllers/userControllers'
import validate from "../middlewares/validate"
import userServices from "../services/userServices"
import { verifyToken } from "../middlewares/verifyToken"
const router: Router = Router()

const { createUserSchema, updateUserSchema, deleteUserSchema } = userServices

const { getUsers, createUser, updateUser, deleteUser } = userControllers

router.use(verifyToken)
router.route('/')
    .get(getUsers)
    .post(validate(createUserSchema), createUser)
    .patch(validate(updateUserSchema), updateUser)
    .delete(validate(deleteUserSchema), deleteUser)



export default router