import { newRentalSchema } from "../schemas/newRentalSchema.js"
import db from "../db.js"

export async function validateRentalData(req, res, next) {
  try {
    await newRentalSchema.validateAsync(req.body)
  } catch (error) {
    return res.sendStatus(400)
  }

  next()
}

export async function validateExistingCostumerAndGame(req, res, next) {
  const { customerId, gameId } = req.body

  try {
    const result = await db.query(
      `SELECT 
    * 
    FROM customers 
    WHERE id = $1
    `,
      [customerId],
    )
    if (result.rowCount === 0) {
      return res.sendStatus(400)
    }
  } catch (error) {
    return res.sendStatus(500)
  }

  try {
    const result = await db.query(
      `SELECT 
    * 
    FROM games 
    WHERE id = $1
    `,
      [gameId],
    )
    if (result.rowCount === 0) {
      return res.sendStatus(400)
    }

    res.locals.gameQueryResult = result.rows[0]
  } catch (error) {
    return res.sendStatus(500)
  }

  next()
}

export async function setSearchQueryObject(req, res, next) {
  const { customerId, gameId, status } = req.query

  const { queryOptions } = res.locals

  let where = ""
  let statusText = ""
  let startDateText = ""
  const values = []

  if (customerId) {
    where = `WHERE rentals."customerId" = $1`
    values.push(customerId)
  }
  if (gameId) {
    where = `WHERE rentals."gameId" = $1`
    values.push(gameId)
  }
  if (customerId && gameId) {
    where = `WHERE rentals."customerId" = $1 AND rentals."gameId" = $2`
  }
  if (status === "open") {
    statusText = `AND rentals."returnDate" IS NULL`
  }
  if (status === "closed") {
    statusText = `AND rentals."returnDate" IS NOT NULL`
  }

  const text = `SELECT 
  rentals.*, 
  customers.id AS customer_id, 
  customers.name AS customer_name, 
  games.id AS game_id, 
  games.name AS game_name, 
  games."categoryId", 
  categories.name AS "categoryName"
  FROM rentals
  JOIN customers ON rentals."customerId" = customers.id
  JOIN games on rentals."gameId" = games.id
  JOIN categories on games."categoryId" = categories.id
  ${where}${statusText}
  ${queryOptions}
  `

  res.locals.queryObject = { text, values }
  console.log("🚀 ~ res.locals.queryObject", res.locals.queryObject)

  next()
}

export async function validateAvailableGame(req, res, next) {
  const { gameQueryResult } = res.locals

  try {
    const result = await db.query(
      `SELECT 
    * 
    FROM rentals 
    WHERE "gameId" = $1 AND "returnDate" IS NULL
    `,
      [gameQueryResult.id],
    )

    if (result.rowCount >= gameQueryResult.stockTotal) {
      return res.sendStatus(400)
    }

    res.locals.gameQueryResult = result.rows[0]
  } catch (error) {
    return res.sendStatus(500)
  }

  next()
}

export async function validateExistingRental(req, res, next) {
  const { id } = req.params

  try {
    const result = await db.query(
      `SELECT 
    * 
    FROM rentals 
    WHERE id = $1
    `,
      [id],
    )

    if (result.rowCount === 0) return res.sendStatus(404)
    if (result.rows[0].returnDate) return res.sendStatus(400)

    res.locals.rentalData = result
  } catch (error) {
    return res.sendStatus(500)
  }

  next()
}
