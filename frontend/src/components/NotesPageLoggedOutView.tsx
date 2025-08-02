import utilStyes from "../styles/utils.module.css"

const NotesPageLoggedOutView = () => {
  return (
    <p className={`${utilStyes.flexCenter} mt-3`}>
      Please login to see your notes
    </p>
  )
}

export default NotesPageLoggedOutView
