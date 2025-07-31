import "dotenv/config"
import mongoose from "mongoose"
import app from "./app"
import env from "./util/validateEnv"

const PORT = env.PORT || 8000

mongoose
  .connect(env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () =>
      console.log(`Server listening on port: ${process.env.PORT}`)
    )
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
