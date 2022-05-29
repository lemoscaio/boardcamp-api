import db from "../db.js"

export async function getCustomers(req, res) {
  const { queryObject } = res.locals
  const result = await db.query(queryObject)
  res.send(result.rows)
}

export async function getCustomerById(req, res) {
  const { queryObject } = res.locals
  const result = await db.query(queryObject)

  if (result.rowCount === 0) return res.sendStatus(404)

  res.send(result.rows)
}

export async function postNewCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body
  try {
    const result = await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday) 
      VALUES ($1, $2, $3, $4)`,
      [name, phone, cpf, birthday],
    )
    res.sendStatus(201)
  } catch (err) {
    if (err.code === "23505") return res.sendStatus(409)

    res.sendStatus(500)
  }
}

export async function updateCustomer(req, res) {
  const { queryObject } = res.locals
  const result = await db.query(queryObject)

  if (result.rowCount === 0) return res.sendStatus(404)

  res.sendStatus(200)
}
