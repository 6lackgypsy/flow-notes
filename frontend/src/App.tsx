import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import LoginModal from "./components/LoginModal"
import NavBar from "./components/Navbar"
import NotesPageLoggedInView from "./components/NotesPageLoggedInView"
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView"
import SignUpModal from "./components/SignUpModal"
import type { User } from "./models/user"
import { getLoggedInUser } from "./network/notesApi"
import styles from "./styles/NotesPage.module.css"

const App = () => {
  const [loggedInInUser, setLoggedInInUser] = useState<User | null>(null)
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await getLoggedInUser()

        setLoggedInInUser(user)
      } catch (error) {
        console.log(error)
      }
    }

    fetchLoggedInUser()
  }, [])

  return (
    <div>
      <NavBar
        loggedInUser={loggedInInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInInUser(null)}
      />
      <Container className={styles.notesPage}>
        {loggedInInUser ? (
          <NotesPageLoggedInView />
        ) : (
          <NotesPageLoggedOutView />
        )}
      </Container>
      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInInUser(user)
            setShowSignUpModal(false)
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedInInUser(user)
            setShowLoginModal(false)
          }}
        />
      )}
    </div>
  )
}

export default App
