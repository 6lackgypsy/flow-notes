import express from "express"
import {
  getAuthenticatedUser,
  login,
  logout,
  signUp
} from "../controllers/users"
import { requiresAuth } from "../middleware/auth"

const router = express.Router()

router.get("/", requiresAuth, getAuthenticatedUser)
router.post("/signup", signUp)
router.post("/login", login)
router.post("/logout", logout)

export default router
