import db from "./../db.js"

export async function getCategories(req, res) {
  const { orderQuery } = res.locals

  const text = `SELECT * 
  FROM categories 
  ${orderQuery}`

  try {
    const result = await db.query(text)

    res.send(result.rows)
  } catch (error) {
    res.sendStatus(500)
  }
}

export async function postNewCategory(req, res) {
  const { name } = req.body
  try {
    const result = await db.query(
      `INSERT INTO categories (name) 
        VALUES ($1)`,
      [name],
    )
    res.sendStatus(201)
  } catch (err) {
    if (err.code === "23505") return res.sendStatus(409)

    res.sendStatus(500)
  }
}
