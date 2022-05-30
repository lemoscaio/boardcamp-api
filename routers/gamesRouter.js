import { Router } from "express"
import {
  validateGameData,
  validateUniqueGame,
  setSearchQueryObject,
} from "../middlewares/gamesMiddleware.js"

import { setQueryOptionsFromQueryStrings } from "../middlewares/commonMiddlewares.js"

import { getGames, postNewGame } from "../controllers/gamesController.js"

const gamesRouter = Router()

gamesRouter.get(
  "/games",
  setQueryOptionsFromQueryStrings,
  setSearchQueryObject,
  getGames,
)
gamesRouter.post("/games", validateGameData, validateUniqueGame, postNewGame)

export default gamesRouter
