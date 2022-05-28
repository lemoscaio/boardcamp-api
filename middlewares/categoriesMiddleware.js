import { newCategorySchema } from "../schemas/newCategorySchema.js"
import db from "./../db.js"

export async function validateCategoryData(req, res, next) {
  console.log("Rodei a validação")

  try {
    await newCategorySchema.validateAsync(req.body)
  } catch (error) {
    console.log(error)

    return res.sendStatus(400)
  }

  next()
}

export async function validateUniqueCategory(req, res, next) {
  try {
    console.log("Rodei a verificação")
    const result = await db.query(`SELECT 
    * 
    FROM categories 
    WHERE name = '${req.body.name}'
    `)
    if (result.rows[0]) {
      return res.sendStatus(409)
    }
  } catch (error) {
    return res.sendStatus(500)
  }

  next()
}
