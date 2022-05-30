import db from "../db.js"

function formatRentalData(rawData) {
  return rawData.map((rentalData) => {
    let {
      customer_id,
      customer_name,
      game_id,
      game_name,
      categoryId,
      categoryName,
      ...primaryData
    } = { ...rentalData }

    const customer = {
      id: customer_id,
      name: customer_name,
    }
    const game = {
      id: game_id,
      name: game_name,
      categoryId: categoryId,
      categoryName: categoryName,
    }

    primaryData.rentDate = primaryData.rentDate.toISOString().slice(0, 10)

    return { ...primaryData, customer, game }
  })
}

function getTodayInStringYYYYMMDD() {
  return new Date().toISOString().slice(0, 10)
}

export async function getRentals(req, res) {
  const { queryObject } = res.locals

  try {
    const result = await db.query(queryObject)

    const formattedData = formatRentalData(result.rows)

    res.send(formattedData)
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function postNewRental(req, res) {
  const { customerId, gameId, daysRented } = req.body
  let rentDate = getTodayInStringYYYYMMDD()

  try {
    const result = await db.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") 
    VALUES (
      $1, $2, $3, $4, $4 * (
      SELECT games."pricePerDay" as "originalPrice" FROM games WHERE games.id = $2
      )
      )`,
      [customerId, gameId, rentDate, daysRented],
    )
    res.sendStatus(201)
  } catch (err) {
    if (err.code === "23505") return res.sendStatus(409)

    res.sendStatus(500)
  }
}

export async function setRentalAsFinished(req, res) {
  const { id } = req.params
  let returnDate = getTodayInStringYYYYMMDD()

  try {
    const result = await db.query(
      `UPDATE rentals 
      SET "returnDate" = $1, "delayFee" = GREATEST((($1 - (rentals."rentDate" + rentals."daysRented")) * rentals."originalPrice"),0)
      WHERE id = $2`,
      [returnDate, id],
    )
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params

  try {
    const result = await db.query(`DELETE FROM rentals WHERE id = $1`, [id])

    if (result.rowCount === 0) return res.sendStatus(404)
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(500)
  }
}
