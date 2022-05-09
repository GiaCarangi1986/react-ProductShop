import { formatDateToBack } from '../../utils/date';
import { roundNumber } from '../../utils';
import { ROLES } from '../../const'

const sendParamsBestSellersSerializer = (params = {}) => {
  const endDate = params?.date_search?.end_at ? new Date(params?.date_search?.end_at) : ''
  if (endDate) {
    endDate.setMinutes(endDate.getMinutes() + 1);
  }
  return {
    dateStart: formatDateToBack(params?.date_search?.start_at || '1753-01-01'), // дата начала
    dateEnd: formatDateToBack(endDate), // дата окончания
  }
}

const getBestSellersSerializer = (params = []) => {
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