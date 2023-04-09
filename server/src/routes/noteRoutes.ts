import { Router } from "express";
import validate from "../middlewares/validate";
import noteServices from "../services/noteServices";
import noteControllers from "../controllers/noteControllers";
import { verifyToken } from "../middlewares/verifyToken";

const router: Router = Router()
const { createNoteSchema, updateNoteSchema, deleteNoteSchema } = noteServices
const { createNote, getAllNotes, updateNote, deleteNote } = noteControllers

router.use(verifyToken)
router.route("/")
    .get(getAllNotes)
    .post(validate(createNoteSchema), createNote)
    .patch(validate(updateNoteSchema), updateNote)
    .delete(validate(deleteNoteSchema), deleteNote)

export default router