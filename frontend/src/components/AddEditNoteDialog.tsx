import { Button, Form, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"
import type { Note } from "../models/notes"
import { createNote, updateNote, type NoteInput } from "../network/notesApi"
import TextInputField from "./form/TextInputField"

interface AddEditNoteDialogProps {
  noteToEdit?: Note
  onDismiss: () => void
  onNoteSaved: (note: Note) => void
}

const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || ""
    }
  })

  const onSubmit = async (input: NoteInput) => {
    try {
      const noteResponse = !noteToEdit
        ? await createNote(input)
        : await updateNote(noteToEdit._id, input)

      onNoteSaved(noteResponse)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? "Edit Note" : "Add Note"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            label="Title"
            type="text"
            placeholder="E.g. My First Note"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />
          <TextInputField
            name="text"
            label="Text"
            as="textarea"
            rows={5}
            placeholder="E.g. Keeping notes is one of the best ways to start living an organized and intentional lifestyle"
            register={register}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddEditNoteDialog
