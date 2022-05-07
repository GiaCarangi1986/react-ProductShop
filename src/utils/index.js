import { useEffect, useState } from 'react';
import { dateFotmattedForTable } from './date';

export function handingErrors(response) {
  const value = response.data;
  let errorsObj = {}
  if (value.statusCode === 500) {
    errorsObj = { key: 'non_field_errors', val: 'Произошла ошибка на сервере. Попробуйте позже' }
  } else {
    errorsObj = {
      key: 'non_field_errors',
      val: value.message || 'Произошла ошибка на сервере. Попробуйте позже'
    }
  }

  return errorsObj
}

export function roundNumber(number = 0) {
  if (!number) {
    return number
  }
  return Math.round(number * 1000) / 1000
}

export function checkNumber(value) {
  if (Number.isNaN(Number(value))) {
    return value;
  }
  return Number(value);
}

export function processingResult(item) {
  return {
    id: item?.id || '', // id чека
    date_time: dateFotmattedForTable(item?.dateTime || new Date()), // дата и время совершения покупки
    kassir: item?.kassir || '', // ФИО кассир
    bonus_pop: item?.bonusPop || 0, // сколько снято бонусов
    sum_without_bonus: item?.totalSum || 0, // сумма без бонусов
    sum: item?.totalSum - item?.bonusPop || 0, // итоговая сумма (после применения бонусов),
    delayed_check: !item?.paidedCheck || false,  // оплачен ли чек (если да, то не отложен)
    changed_check: item?.changedCheck || false, // редактированный ли чек
    mayActions: item.mayActions || false // можно ли редакт/удалять чек (ограничение - до 3 часов после пробивки)
  };
}

const arrCorrectProductLines = (linesOfCheck = []) => {
  const linesCheckList = [];
  linesOfCheck.forEach(line => {
    const productLine = {
      id: line?.id || 0, // id продукта (штрих-код)
      count: line?.count || 0, // кол-во продктов в одной строке,
      price: line?.price || 0, // цена за 1 штуку/кг
      old_product: line?.old_product || false // 50% за продуктый, который завтра испортится? (предупреждают на кассе)
    }
    linesCheckList.push(productLine)
  })
  return linesCheckList
}

export const calcTotalCostInLine = (checkLines = []) => {
  const newArr = []
  checkLines.forEach(line => {
    const newLine = { ...line }
    newLine.total_cost = roundNumber(line.price * line.count)
    newArr.push(newLine)
  })
  return newArr
}

export function totalCostFunc(linesOfCheck) {
  let totalCost = 0
  linesOfCheck.forEach(line => {
    totalCost += line.count * line.price
  })
  return roundNumber(totalCost)
}

export function generatCheck(discountCard = {}, linesOfCheck = [], currentUser = {}, paid = false, changedCheck = false) {
  let totalCost = totalCostFunc(linesOfCheck)

  const linesCheckList = arrCorrectProductLines(linesOfCheck)

  return {
    date_time: new Date(), // время покупки/отложенного чека
    bonus_count: +discountCard?.bonus || 0, // кол-во использованных бонусов
    totalCost, // итоговая стоимость (без бонусов)
    paid, // оплачен чек или нет (на данном этапе только false, ибо он тут отложен или только подготовлен к оплате)
    cardId: discountCard?.card?.value || discountCard?.id || null, // id карты (через id обращаемся при редактировании)
    linesCheckList, // строки чека,
    kassirId: currentUser.id, // id кассира, пробившего чек
    parentCheckId: null, // id чека-родителя (для отредактированного чека)
    changedCheck: Boolean(changedCheck), // пометка, что чек был редактирован - нужна для отображения в табл другим цветом
  };
}

export function deleteSpaces(value) {
  if (value) {
    return value.toString().trimStart().trimEnd()
  }
  return value
}

export function formateInt(number) {
  return number.replace(/[^\d]+/g, '')
}

export function formateFloat(number) {
  return Math.abs(number.replace(/[^\d](\.\d+)+/g, ''))
}

export function useNetwork() {
  const [isOffline, setNetwork] = useState(!window.navigator.onLine);
  useEffect(() => {
    window.addEventListener('offline', () => setNetwork(!window.navigator.onLine));
    window.addEventListener('online', () => setNetwork(!window.navigator.onLine));
  }, []);
  return isOffline;
};

export function declensionBonusNumber(digital = 0) {
  const ost = +digital % 10
  if (ost === 1) {
    return ''
  }
  if (ost >= 2 && ost <= 4) {
    return 'а'
  }
  if (!ost || ost > 4) {
    return 'ов'
  }
};

export function declensionProduct(digital = 0) {
  if (digital === 1) {
    return 'а'
  }
  return 'ов'
};

export function capitalize(input) {
  return input.replace(/( |^)[а-яёa-z]/g, function (u) { return u.toUpperCase(); });
}