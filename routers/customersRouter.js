import { Router } from "express"
import {
  validateCustomerData,
  validateUniqueCostumer,
  validateCpfConflictOnUpdate,
  setSearchQueryObject,
  setUpdateQueryObject,
} from "../middlewares/customersMiddleware.js"

import {
  getCustomers,
  getCustomerById,
  postNewCustomer,
  updateCustomer,
} from "../controllers/customersController.js"

const customersRouter = Router()

customersRouter.get("/customers", setSearchQueryObject, getCustomers)
customersRouter.get("/customers/:id", setSearchQueryObject, getCustomerById)
customersRouter.post(
  "/customers",
  validateCustomerData,
  validateUniqueCostumer,
  postNewCustomer,
)
customersRouter.put(
  "/customers/:id",
  validateCustomerData,
  validateCpfConflictOnUpdate,
  setUpdateQueryObject,
  updateCustomer,
)

export default customersRouter
