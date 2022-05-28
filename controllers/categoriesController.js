import db from "./../db.js"

export async function getCategories(req, res) {
  const result = await db.query(`SELECT * FROM categories`)
  console.log(result)

  res.send(result.rows)
}

export async function postNewCategory(req, res) {
  try {
    const result = await db.query(
      `INSERT INTO categories (name) 
        VALUES ('${req.body.name}')`,
    )

    console.log({ result })

    res.send(201)
  } catch (err) {
    res.send(err)
  }
}
