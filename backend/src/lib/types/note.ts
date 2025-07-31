export type CreateNoteBody = {
  title?: string // So we can get through to check if the usually actually sent a title and handle the error
  text?: string
}

export type UpdateNoteBody = {
  title?: string
  text?: string
}

export type UpdateParams = {
  id: string
}
