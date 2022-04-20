import { processingResult } from '../../utils'
import { NAMES } from '../../const'
import { formatDateToBack, dateFotmattedForTable } from '../../utils/date';

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
  dateStart: formatDateToBack(params?.date_search?.start_at || '1753-01-01'), // дата начала
  dateEnd: formatDateToBack(params?.date_search?.end_at || ''), // дата окончания
  pageSize: params.page_size // кол-во получения за 1 запрос
})

const createCheckSerializer = (check, parentCheckId) => {
  const serCheckList = []
  check.linesCheckList.forEach(line => {
    serCheckList.push({
      productCount: line.count, // кол-во продуктов в строке
      productFK: line.id, // Id продукта
      oldProduct: line.old_product, // выставлена ли скидка 50% на данный товар
      price: line.price // цена товара
    })
  })

  return ({
    bonusCount: check.bonus_count, // кол-во снятых бонусов
    bonusCardFK: check.cardId, // id бонусной карты
    changedCheck: check.changedCheck, // был ли чек редактирован
    dateTime: formatDateToBack(check.date_time), // дата и время покупки
    userFK: check.kassirId, // id пользователя, пробившего чек
    checkLines: serCheckList, // строки чека
    paid: check.paid, // был чек оплачен (или отложен)
    parentCheckId, // id нового чека, которое указывается у редактированного чека
    totalSum: check.totalCost, // итоговая стоимость (без бонусов)
  })
}

const checkHistorySerializer = (checks = []) => {
  const checksSer = []
  checks.forEach(check => {
    const _check = {
      id: check?.id || 0, // id чека
      date_time: dateFotmattedForTable(check?.dateTime), // дата и время покупки ****** мб потом время настроить
      kassirName: check?.kassir || '', // fio кассира
      totalSum: check?.totalSum || 0, // итоговая сумма (без бонусов)
      bonus_count: check?.bonusCount || 0, // потрачено бонусов
      paidedCheck: check?.paid || false, // оплачен ли чек
      cardId: check?.cardFK || null // id бонусной карты
    }

    const _line = []
    check.checkLines?.forEach(line => {
      _line.push({
        id: line.id, // id строки чека
        count: line.productCount, // кол-во проудктов в чеке
        price: line.price, // цена продукта из чека
        old_product: line.oldProduct, // является ли продукт из строки чека старым
        label: line.productName, // название продукта
        mayBeOld: line.mayBeOld, // может ли бы старым продукт
        sale: line.sale, // распространяется ли скидка на продукт
      })
    })

    checksSer.push({ ..._check, linesCheckList: _line })
  })
  return checksSer
}

export { checkGetSerializer, checkParamsSerializer, createCheckSerializer, checkHistorySerializer };