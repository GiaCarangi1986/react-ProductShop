const getSaleSerializer = (params = []) => {
  const serList = []
  params.forEach(el => {
    serList.push({
      id: el.id, // id
      start_date: el.dateStart, // дата начала проведения акции
      end_date: el.dateEnd, // дата окончания проведения акции
      discountPercent: el.discountPercent, // размер скидки
      product_count: el.productCount, // кол-во продуктов, участвующих в акции
    })
  })
  return serList
}

export { getSaleSerializer };