export default function formatRentalData(rawData) {
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
    if (primaryData.returnDate) {
      primaryData.returnDate = primaryData.returnDate.toISOString().slice(0, 10)
    }

    return { ...primaryData, customer, game }
  })
}
