import { Button, Navbar } from "react-bootstrap"
import type { User } from "../models/user"
import { logout as logoutUser } from "../network/notesApi"

interface NavBarLoggedInViewProps {
  user: User
  onLogoutSuccessful: () => void
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful
}: NavBarLoggedInViewProps) => {
  const logout = async () => {
    try {
      await logoutUser()
      onLogoutSuccessful()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar.Text className="me-2">Signed in as: {user.username}</Navbar.Text>
      <Button onClick={logout}>Logout</Button>
    </>
  )
}

export default NavBarLoggedInView
