import { newGameSchema } from "../schemas/newGameSchema.js"
import db from "../db.js"

export async function validateGameData(req, res, next) {
  try {
    await newGameSchema.validateAsync(req.body)
  } catch (error) {
    return res.status(900).send(error)
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
      return res.status(400).send(result)
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

  const { queryOptions } = res.locals

  const text = `SELECT 
  games.*, 
  categories.name as categoryName, 
  count(rentals."rentDate") as "rentalsCount"
  FROM categories 
  JOIN games ON games."categoryId" = categories.id
  LEFT JOIN rentals on rentals."gameId" = games.id
  WHERE games.name ILIKE $1
  group by games.id, categories.name
  ${queryOptions}
  `
  const values = [name ? `%${name}%` : "%"]

  res.locals.queryObject = { text, values }
  next()
}
