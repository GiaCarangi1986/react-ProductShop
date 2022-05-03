import { formatDateToBack, dateFotmattedForTable } from '../../utils/date';

const bestSellersSerializer = (params = {}) => ({
  dateStart: formatDateToBack(params?.date_search?.start_at || '1753-01-01'), // дата начала
  dateEnd: formatDateToBack(params?.date_search?.end_at || ''), // дата окончания
})

export { bestSellersSerializer };