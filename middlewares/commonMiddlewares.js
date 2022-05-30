export async function setQueryOptionsFromQueryStrings(req, res, next) {
  console.log(
    "🚀 ~ setQueryOptionsFromQueryStrings",
    setQueryOptionsFromQueryStrings,
  )
  const { order, desc, offset, limit } = req.query
  console.log("🚀 ~ limit", limit)

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
  console.log("🚀 ~ res.locals.queryOptions", res.locals.queryOptions)
  next()
}
