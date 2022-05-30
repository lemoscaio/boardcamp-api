import { Router } from "express"
import {
  validateRentalData,
  validateExistingCostumerAndGame,
  validateAvailableGame,
  setSearchQueryObject,
  validateExistingRental,
} from "../middlewares/rentalsMiddleware.js"

import { setOrderQuery } from "../middlewares/commonMiddlewares.js"

import {
  getRentals,
  postNewRental,
  setRentalAsFinished,
  deleteRental,
} from "../controllers/rentalsController.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", setOrderQuery, setSearchQueryObject, getRentals)
rentalsRouter.post(
  "/rentals",
  validateRentalData,
  validateExistingCostumerAndGame,
  validateAvailableGame,
  postNewRental,
)
rentalsRouter.post(
  "/rentals/:id/return",
  validateExistingRental,
  setRentalAsFinished,
)
rentalsRouter.delete("/rentals/:id", validateExistingRental, deleteRental)

export default rentalsRouter
