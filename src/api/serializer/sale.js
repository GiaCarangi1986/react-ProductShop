import { dateFotmattedForMakeDelivery } from '../../utils/date';
import { SALE_KIND } from '../../const';

const getSaleSerializer = (params = []) => {
  const serList = []
  params.forEach(el => {
    const nowDate = new Date().getTime()
    const startDate = new Date(el.dateStart)?.getTime()
    const endDate = new Date(el.dateEnd)?.getTime()
    const status = endDate < nowDate ? SALE_KIND.past : startDate <= nowDate ? SALE_KIND.present : SALE_KIND.future
    serList.push({
      id: el.id, // id
      start_date: dateFotmattedForMakeDelivery(el.dateStart), // дата начала проведения акции
      end_date: dateFotmattedForMakeDelivery(el.dateEnd), // дата окончания проведения акции
      discountPercent: el.discountPercent, // размер скидки
      product_count: el.productCount, // кол-во продуктов, участвующих в акции
      status // статус акции (прошла, идет, запланирована)
    })
  })
  return serList
}

export { getSaleSerializer };