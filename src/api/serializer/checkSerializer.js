import { processingResult } from '../../utils'
import { NAMES } from '../../const'

const checkGetSerializer = (res) => {
  if (res) {
    const checkList = [...res.results].map(item => {
      return processingResult(item);
    });

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
  dateStart: params?.date_search?.start_at, // дата начала
  dateEnd: params?.date_search?.end_at, // дата окончания
  pageSize: params.page_size // кол-во получения за 1 запрос
})

export { checkGetSerializer, checkParamsSerializer };