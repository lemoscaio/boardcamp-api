import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import categoriesRouter from "./routers/categoriesRouter.js"
import gamesRouter from "./routers/gamesRouter.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use(categoriesRouter)
app.use(gamesRouter)

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`)
})
