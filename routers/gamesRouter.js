import { Router } from "express"
import {
  validateGameData,
  validateUniqueGame,
  setQueryTextandValues,
} from "../middlewares/gamesMiddleware.js"

import { getGames, postNewGame } from "../controllers/gamesController.js"

const gamesRouter = Router()

gamesRouter.get("/games", setQueryTextandValues, getGames)
gamesRouter.post("/games", validateGameData, validateUniqueGame, postNewGame)

export default gamesRouter
