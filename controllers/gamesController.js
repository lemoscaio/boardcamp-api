import db from "../db.js"

export async function getGames(req, res) {
  const { queryObject } = res.locals
  try {
    const result = await db.query(queryObject)
    res.send(result.rows)
  } catch (error) {
    res.sendStatus(500)
  }
}

export async function postNewGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body
  try {
    const result = await db.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
      VALUES ($1, $2, $3, $4, $5)`,
      [name, image, stockTotal, categoryId, pricePerDay],
    )
    res.sendStatus(201)
  } catch (err) {
    if (err.code === "23505") return res.sendStatus(409)

    res.sendStatus(500)
  }
}
