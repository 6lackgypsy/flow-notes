import { RequestHandler } from "express"
import createHttpError from "http-errors"
import mongoose from "mongoose"
import { CreateNoteBody, UpdateNoteBody, UpdateParams } from "../lib/types/note"
import Note from "../models/note"
import { assertIsDefined } from "../util/assertIsDefined"

export const getNotes: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    const notes = await Note.find({ userId: authenticatedUserId }).exec()

    res.status(200).json(notes)
  } catch (error) {
    next(error)
  }
}

export const getNote: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Invalid note Id")

    const note = await Note.findById(id).exec()

    if (!note) throw createHttpError(404, "Note not found")

    if (!note.userId.equals(authenticatedUserId))
      throw createHttpError(401, "You cannot access this note")

    res.status(200).json(note)
  } catch (error) {
    next(error)
  }
}

interface CreateNoteBody {
  title?: string // So we can get through to check if the usually actually sent a title and handle the error
  text?: string
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    if (!title) throw createHttpError(400, "Note must have a title")

    const newNote = await Note.create({
      title,
      text,
      userId: authenticatedUserId
    })

    res.status(201).json(newNote)
  } catch (error) {
    next(error)
  }
}

interface UpdateNoteBody {
  title?: string
  text?: string
}

interface UpdateParams {
  id: string
}

export const updateNote: RequestHandler<
  UpdateParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params
  const { title, text } = req.body
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    if (!mongoose.isValidObjectId(id))
      throw createHttpError(400, "Invalid note Id")

    if (!title) throw createHttpError(400, "Note must have a title")

    const note = await Note.findById(id).exec()

    if (!note) throw createHttpError(404, "Note not found")

    if (!note.userId.equals(authenticatedUserId))
      throw createHttpError(401, "You cannot access this note")

    note.title = title
    note.text = text

    const updatedNote = await note.save()

    res.status(200).json(updatedNote)
  } catch (error) {
    next(error)
  }
}

export const deleteNote: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid note Id")
    }

    const note = await Note.findById(id).exec()

    if (!note) {
      throw createHttpError(404, "Note not found")
    }

    if (!note.userId.equals(authenticatedUserId))
      throw createHttpError(401, "You cannot access this note")

    await note.deleteOne()

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
