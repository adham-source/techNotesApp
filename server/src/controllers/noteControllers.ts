import { Request, Response } from "express"
import expressAsyncHandler from "express-async-handler"
import Note from "../models/Note"
import CustomErrors from "../services/customErrors"
import User from "../models/User"

class NoteControllers {
  /**
   * @desc Get all notes
   * @route GET /api/v1/notes
   * @access Private
   */
  getAllNotes = expressAsyncHandler(async (req: Request, res: Response):Promise<void> => {
    const notes = await Note.find()
      .populate('user', 'name email').lean();
    
    if (notes.length === 0) {
      throw new CustomErrors(404, "No notes found");
    }
    
    
    // const notesWithUser = await Promise.all(
    //   notes.map(async (note) => {
    //     const user = await User.findById(note.user).lean().exec()
    //     return { ...note, name: user.name }
    //   }),
    // )

    res.json({
      success: true,
      notes,
    })
  })

  /**
   * @desc Create a new note
   * @route POST /api/v1/notes
   * @access Private
   */
  createNote = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { user, title, text } = req.body
    const duplicate = await Note.findOne({ title }).lean().exec()

    if (duplicate) {
      throw new CustomErrors(409, 'Duplicate note title')
    }

    

    const note = await Note.create({ user, title, text })
    
    if(!note) {
      throw new CustomErrors(400, 'Invalid note data received')
    }

    res.status(201).json({
      success: true,
      message: "New note created"
    })
  })

  /**
   * @desc Update a note
   * @route PATCH /api/v1/notes
   * @access Private
   */
  updateNote = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id, title } = req.body
    const note = await Note.findById(id).exec()
    
    if (!note) {
      throw new CustomErrors(400, 'Note not found')
    }

    const duplicate = await Note.findOne({ title, _id: { $ne: id } }).lean().exec()

    if (duplicate) {
      throw new CustomErrors(409, 'Duplicate note title')
    }
    const updatedNote = await Note.findByIdAndUpdate(id, req.body , { new: true, runValidators: true }).lean().exec();

    if(!updatedNote) {
      throw new CustomErrors(400, 'Invalid note data received')
    }

    // note.user = user
    // note.title = title
    // note.text = text
    // note.completed = completed
    
    // const updatedNote = await note.save()

    res.json({ success: true, message: `'${updatedNote.title}' updated`})
  })
  /**
   * @desc Delete a note
   * @route DELETE /api/v1/notes
   * @access Private
   */
  deleteNote = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body

    const note = await Note.findById(id).exec()
    if (!note) {
      throw new CustomErrors(400, 'Note not found')
    }

    const result = await note.deleteOne()

    const message = `Note '${result.title}' with ID ${result._id} deleted`

    res.json({
      success: true,
      message
    })

  })
}

const noteControllers = new NoteControllers()

export default noteControllers
