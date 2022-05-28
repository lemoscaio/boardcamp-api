import Joi from "joi"

export const newGameSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().uri(),
  stockTotal: Joi.number().min(1).required(),
  categoryId: Joi.number().required(),
  pricePerDay: Joi.number().min(0.01).required(),
})
