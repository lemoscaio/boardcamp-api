import { newGameSchema } from "../schemas/newGameSchema.js"
import db from "../db.js"

export async function validateGameData(req, res, next) {
  try {
    await newGameSchema.validateAsync(req.body)
  } catch (error) {
    return res.sendStatus(400)
  }

  next()
}

export async function validateUniqueGame(req, res, next) {
  const { name, categoryId } = req.body
  try {
    const result = await db.query(`SELECT 
    * 
    FROM categories 
    WHERE id = ${categoryId}
    `)
    if (result.rowCount === 0) {
      return res.sendStatus(400)
    }
  } catch (error) {
    return res.sendStatus(500)
  }

  try {
    const result = await db.query(`SELECT 
    * 
    FROM games 
    WHERE name = '${name}'
    `)
    if (result.rowCount > 0) {
      return res.sendStatus(409)
    }
  } catch (error) {
    return res.sendStatus(500)
  }

  next()
}

export async function setSearchQueryObject(req, res, next) {
  const { name } = req.query

  const { orderQuery } = res.locals

  const text = `SELECT games.*, categories.name as categoryName
  FROM categories 
  JOIN games ON games."categoryId" = categories.id
  WHERE games.name ILIKE $1
  ${orderQuery}
  `
  const values = [name ? `%${name}%` : "%"]

  res.locals.queryObject = { text, values }
  next()
}
