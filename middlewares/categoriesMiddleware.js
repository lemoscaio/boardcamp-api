import { newCategorySchema } from "../schemas/newCategorySchema.js"
import db from "./../db.js"

export async function validateCategoryData(req, res, next) {
  try {
    await newCategorySchema.validateAsync(req.body)
  } catch (error) {
    return res.sendStatus(400)
  }

  next()
}

export async function validateUniqueCategory(req, res, next) {
  try {
    const result = await db.query(`SELECT 
    * 
    FROM categories 
    WHERE name = '${req.body.name}'
    `)
    if (result.rowCount > 0) {
      return res.sendStatus(409)
    }
  } catch (error) {
    return res.sendStatus(500)
  }

  next()
}
