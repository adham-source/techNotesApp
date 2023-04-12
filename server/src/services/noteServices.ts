import { isValidObjectId } from "mongoose"
import { boolean, object, string, array } from "zod"

class NoteServices {
    private readonly createNote = {
        body: object({
            user: string({
                required_error: "User ID is required."
            }).trim().refine((value) => isValidObjectId(value), 'Invalid Assign'),
            title: string({
                required_error: "Title is required."
            }).trim().min(3, "Title must contain at least 3 characters").max(20),
            text: string({
                required_error: "Text is required."
            }).trim().min(10, "Text must contain at least 10 characters").max(1000),
            completed: boolean().default(false)
        }).strict()
    }

    private readonly updateNote = {
        body: object({
            id: string({
                required_error: "Note ID is required."
            }).trim().refine((value) => isValidObjectId(value), 'Invalid Assign'),
            user: string({
                required_error: "User ID is required."
            }).trim().refine((value) => isValidObjectId(value), 'Invalid Assign'),
            title: string({
                required_error: "Title is required."
            }).trim().min(3, "Title must contain at least 3 characters").max(100),
            text: string({
                required_error: "Text is required."
            }).trim().min(10, "Text must contain at least 10 characters").max(1000),
            completed: boolean().default(false)
        }).strict()
    }

    private readonly deleteNote = {
        body: object({
            id: string({
                required_error: "Note ID is required."
            }).trim().refine((value) => isValidObjectId(value), 'Invalid Assign')
        }).strict()
    }



    public createNoteSchema = object({
        ...this.createNote
    })
    
    public updateNoteSchema = object({
        ...this.updateNote
    })

    public deleteNoteSchema = object({
        ...this.deleteNote
    })

    
}

const noteServices = new NoteServices()
export default noteServices