import { Router } from "express"
import authControllers from "../controllers/authControllers"
import authServices from "../services/authServices"
import loginLimiter from "../middlewares/loginLimiter"
import validate from "../middlewares/validate"

const router: Router = Router()

const { login, refresh, logout } = authControllers
const { loginAuthSchema } = authServices

router.route("/")
    .post(validate(loginAuthSchema), loginLimiter, login)
router.route("/refresh")
    .get(refresh)

router.route("/logout")
    .post(logout)


export default router