import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import AddEditNoteDialog from "./components/AddEditNoteDialog"
import Note from "./components/Note"
import type { Note as NoteModel } from "./models/notes"
import { deleteNote, fetchNotes } from "./network/notesApi"
import styles from "./styles/NotesPage.module.css"
import utilStyles from "./styles/utils.module.css"

const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notes = await fetchNotes()

        setNotes(notes)
      } catch (error) {
        console.error(error)
      }
    }

    loadNotes()
  }, [])

  const handleDelete = async (note: NoteModel) => {
    try {
      await deleteNote(note._id)

      setNotes(notes.filter((existingNote) => existingNote._id !== note._id))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <Button
        className={`mb-4 ${utilStyles.blockCenter} ${utilStyles.flexCenter}`}
        onClick={() => setShowAddEditNoteDialog(true)}
      >
        <Plus size={20} />
        Add New Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes?.map((note) => (
          <Col key={note._id} className="g-4">
            <Note
              note={note}
              className={styles.note}
              onNoteClicked={setNoteToEdit}
              onDeleteNote={handleDelete}
            />
          </Col>
        ))}
      </Row>
      {showAddEditNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddEditNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote])
            setShowAddEditNoteDialog(false)
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            )
            setNoteToEdit(null)
          }}
        />
      )}
    </Container>
  )
}

export default App
