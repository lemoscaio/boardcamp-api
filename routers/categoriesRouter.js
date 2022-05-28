import { Router } from "express"
import {
  validateCategoryData,
  validateUniqueCategory,
} from "./../middlewares/categoriesMiddleware.js"

import {
  getCategories,
  postNewCategory,
} from "./../controllers/categoriesController.js"

const categoriesRouter = Router()

categoriesRouter.get("/categories", getCategories)
categoriesRouter.post(
  "/categories",
  validateCategoryData,
  validateUniqueCategory,
  postNewCategory,
)

export default categoriesRouter
