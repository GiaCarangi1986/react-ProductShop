import { dateFotmattedForMakeDelivery } from "../../utils/date"
import { roundNumber } from "../../utils"

const getRevenueDataSerializer = (params = []) => {
  const list = []
  params.forEach(el => {
    list.push({
      name: dateFotmattedForMakeDelivery(el.date), //'12.12.2022'
      выручка: roundNumber(el.revenue), //43000
      'валовая прибыль': roundNumber(el.grossProfit), //2400
      'использовано бонусов': el.usedBonuses // 400,
    })
  })
  return list
}

export { getRevenueDataSerializer };