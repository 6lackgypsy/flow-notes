import { Button } from "react-bootstrap"

interface NavbarLoggedOutViewProps {
  onSignUpClicked: () => void
  onLogInClicked: () => void
}

const NavbarLoggedOutView = ({
  onSignUpClicked,
  onLogInClicked
}: NavbarLoggedOutViewProps) => {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign Up</Button>
      <Button onClick={onLogInClicked}>Login</Button>
    </>
  )
}

export default NavbarLoggedOutView
