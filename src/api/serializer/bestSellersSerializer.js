import { formatDateToBack } from '../../utils/date';
import { roundNumber } from '../../utils';

const sendParamsBestSellersSerializer = (params = {}) => ({
  dateStart: formatDateToBack(params?.date_search?.start_at || '1753-01-01'), // дата начала
  dateEnd: formatDateToBack(params?.date_search?.end_at || ''), // дата окончания
})

const getBestSellersSerializer = (params = []) => {
  const ROLES = {
    admin: 'Администратор',
    mainKassir: 'Старший кассир',
    kassir: 'Кассир'
  }
  const list = []
  params.forEach(el => {
    list.push({
      fio: el.fio,
      sales: roundNumber(el.sales),
      role: ROLES[el.role],
      id: el.id
    })
  })
  return list
}

export { sendParamsBestSellersSerializer, getBestSellersSerializer };