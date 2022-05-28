import Joi from "joi"

export const newCategorySchema = Joi.object({
  name: Joi.string().required(),
})
