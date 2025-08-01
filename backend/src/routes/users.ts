import express from "express"
import { getAuthenticatedUser, login, signUp } from "../controllers/users"

const router = express.Router()

router.get("/", getAuthenticatedUser)
router.post("/signup", signUp)
router.post("/login", login)
router.post("/logout", logout)

export default router
