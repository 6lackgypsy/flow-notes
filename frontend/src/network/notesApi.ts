import type { Note } from "../models/notes"

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init)

  if (!response.ok) {
    const errorBody = await response.json()
    const errorMessage = errorBody.error

    throw new Error(errorMessage)
  }

  return response
}

export const fetchNotes = async (): Promise<Note[]> => {
  const response = await fetchData("/api/notes")

  return response.json()
}

export type NoteInput = { title: string; text?: string }

export const createNote = async (note: NoteInput): Promise<Note> => {
  const response = await fetchData("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note)
  })

  return response.json()
}

export const updateNote = async (noteId: string, note: NoteInput) => {
  const response = await fetchData(`/api/notes/${noteId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note)
  })

  return response.json()
}

export const deleteNote = async (noteId: string) => {
  await fetchData(`/api/notes/${noteId}`, { method: "DELETE" })
}
