import { roundWeight } from '../../utils'

const getPopularProductsSerializer = (params = []) => {
  const list = []
  params.forEach(el => {
    list.push({
      title: el.title,
      sale_count: roundWeight(el.countOfSale),
      manufacturer: el.manufacturer,
      id: el.id,
      category: el.category
    })
  })
  return list
}

export { getPopularProductsSerializer };