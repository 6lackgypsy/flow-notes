import { useState } from "react"
import { Alert, Button, Form, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { UnauthorizedError } from "../errors/httpErrors"
import type { User } from "../models/user"
import { login, type LoginCredentials } from "../network/notesApi"
import utilStyles from "../styles/utils.module.css"
import TextInputField from "./form/TextInputField"

interface LoginModalProps {
  onDismiss: () => void
  onLoginSuccessful: (user: User) => void
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginCredentials>()

  const onSubmit = async (credentials: LoginCredentials) => {
    try {
      const user = await login(credentials)

      onLoginSuccessful(user)
    } catch (error) {
      if (error instanceof UnauthorizedError) setErrorText(error.message)

      console.log(error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            type="text"
            name="username"
            label="Username"
            placeholder="Enter your username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={utilStyles.width100}
          >
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
