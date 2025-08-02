import { Trash2Icon } from "lucide-react"
import type React from "react"
import { Card } from "react-bootstrap"
import type { Note as NoteModel } from "../models/notes"
import styles from "../styles/Note.module.css"
import utilStyles from "../styles/utils.module.css"
import { formatDate } from "../utils/formatDate"

interface NoteProps {
  note: NoteModel
  onNoteClicked: (note: NoteModel) => void
  onDeleteNote: (note: NoteModel) => void
  className?: string
}

const Note = ({ note, className, onNoteClicked, onDeleteNote }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note

  const createdUpdatedText: string =
    updatedAt > createdAt
      ? `Updated: ${formatDate(updatedAt)}`
      : `Created: ${formatDate(createdAt)}`

  const deleteNote = (event: React.MouseEvent<SVGSVGElement>) => {
    onDeleteNote(note)
    event.stopPropagation()
  }

  return (
    <Card
      className={`${styles.noteCard} ${className}`}
      onClick={() => onNoteClicked(note)}
    >
      <Card.Body>
        <Card.Title className={utilStyles.flexCenter}>
          {title}
          <Trash2Icon className="text-muted ms-auto" onClick={deleteNote} />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  )
}

export default Note
