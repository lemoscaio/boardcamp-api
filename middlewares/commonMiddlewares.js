export async function setQueryOptionsFromQueryStrings(req, res, next) {
  const { order, desc, offset, limit } = req.query

  let orderQuery = ""
  let orderDirection = desc ? "DESC" : "ASC"
  if (order) {
    orderQuery = `ORDER BY "${order}" ${orderDirection}`
  }

  let offsetQuery = ""
  if (offset) {
    offsetQuery = `OFFSET ${offset}`
  }

  let limitQuery = ""
  if (limit) {
    limitQuery = `LIMIT ${limit}`
  }

  let queryOptions = `
  ${orderQuery}
  ${offsetQuery}
  ${limitQuery}
  `

  res.locals.queryOptions = queryOptions
  next()
}
