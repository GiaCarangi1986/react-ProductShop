import { processingResult } from '../../utils'
import { NAMES } from '../../const'
import { formatDateToBack } from '../../utils/date';

const checkGetSerializer = (res) => {
  if (res) {
    const checkList = [...res.results].map(item => {
      return processingResult(item);
    });
    console.log('checkList', checkList)
    const checks = {
      count: res.count,
      results: checkList,
      next: res.next,
      cols_names: NAMES,
    }
    return checks;
  }

  return null;
}

const checkParamsSerializer = (params = {}) => ({
  changedShow: params.changed_show, // показать только редактированные чеки
  delayedShow: params.delayed_show, // показать только неоплаченные чеки
  dateStart: formatDateToBack(params?.date_search?.start_at || '1753-01-01'), // дата начала
  dateEnd: formatDateToBack(params?.date_search?.end_at || ''), // дата окончания
  pageSize: params.page_size // кол-во получения за 1 запрос
})

export { checkGetSerializer, checkParamsSerializer };