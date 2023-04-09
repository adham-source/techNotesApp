import { Router } from 'express'
import rootRouter from './root'
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import noteRoutes from './noteRoutes'

const router:Router = Router()

router.use("/", rootRouter)

router.use("/api/v1/auth", authRoutes)

router.use("/api/v1/users", userRoutes)
router.use("/api/v1/notes", noteRoutes)


export default router