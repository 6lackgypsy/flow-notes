import { useState } from "react"
import { Alert, Button, Form, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { ConflictError } from "../errors/httpErrors"
import type { User } from "../models/user"
import { signUp, type SignUpCredentials } from "../network/notesApi"
import utilStyles from "../styles/utils.module.css"
import TextInputField from "./form/TextInputField"

interface SignUpModalProps {
  onDismiss: () => void
  onSignUpSuccessful: (user: User) => void
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpCredentials>()

  const onSubmit = async (credentials: SignUpCredentials) => {
    try {
      const newUser = await signUp(credentials)

      onSignUpSuccessful(newUser)
    } catch (error) {
      if (error instanceof ConflictError) setErrorText(error.message)

      console.log(error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            type="text"
            name="username"
            label="Username"
            placeholder="E.g. CoolKid12"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            type="email"
            name="email"
            label="Email"
            placeholder="E.g. name@example.com"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
          />
          <TextInputField
            type="password"
            name="password"
            label="Password"
            placeholder="Enter a solid password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={utilStyles.width100}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SignUpModal
