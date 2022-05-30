export async function setOrderQuery(req, res, next) {
  console.log("🚀 ~ setOrderQuery", setOrderQuery)
  const { order, desc } = req.query

  let orderQuery = ""
  let orderDirection = desc ? "DESC" : "ASC"

  if (order) {
    orderQuery = `ORDER BY "${order}" ${orderDirection}`
  }
  res.locals.orderQuery = orderQuery

  next()
}
