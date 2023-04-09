import { Request, Response, Router } from "express";

const router: Router = Router()

router.get("/", (req: Request, res: Response): void => {

    res.render("index", {
        title: "TechNotesApp",
        message: "api tech notes"
    })
})

export default router