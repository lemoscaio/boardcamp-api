import { Router } from "express"
import {
  validateGameData,
  validateUniqueGame,
  setSearchQueryObject,
} from "../middlewares/gamesMiddleware.js"

import { setOrderQuery } from "../middlewares/commonMiddlewares.js"

import { getGames, postNewGame } from "../controllers/gamesController.js"

const gamesRouter = Router()

gamesRouter.get("/games", setOrderQuery, setSearchQueryObject, getGames)
gamesRouter.post("/games", validateGameData, validateUniqueGame, postNewGame)

export default gamesRouter
