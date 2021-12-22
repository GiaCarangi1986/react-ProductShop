import { useEffect, useState } from 'react';
import dayjs from './day';

export function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function setCookie(name, token, days) {
  const date = new Date();
  const value = token || '';
  let expires = '';
  if (days) {
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value};${expires};path=/`;
  return true;
}

export function removeCookie(name) {
  return setCookie(name, '', -999);
}

export function handingErrors(response) {
  const value = response.data;
  let errorsObj = {}
  if (response.status === 500) {
    errorsObj = { key: 'non_field_errors', val: 'Произошла ошибка на сервере. Попробуйте позже' }
  } else {
    errorsObj = {
      key: Object.keys(value)[0] || 'non_field_errors',
      val: value[Object.keys(value)[0]][0] || 'Произошла ошибка на сервере. Попробуйте позже'
    }
  }

  return errorsObj
}

export function checkNumber(value) {
  if (Number.isNaN(Number(value))) {
    return value;
  }
  return Number(value);
}

export function compareNumeric(a, b) {
  if (a.value > b.value) return 1;
  if (a.value === b.value) return 0;
  return -1;
}

export function cods(code, results, value = 'pk') {

  const neededValues = code.length ? [] : results
  if (code.length) {

    for (let index = 0; index < code.length; index += 1) {
      for (let el = 0; el < results.length; el += 1) {
        if (code[index] === results[el][value]) {
          neededValues.push(results[el])
        }
      }
    }
  }
  return neededValues;
}

function dateFotmattedForTable(date) {
  let currentDate = ''
  if (dayjs(date).isValid()) {
    currentDate = dayjs(date).format('DD.MM.YYYY')
  }
  return currentDate
}

function dateFotmattedForModal(date) {
  let currentDate = ''
  if (dayjs(date).isValid()) {
    currentDate = dayjs(date).format('YYYY-MM-DDTHH:mm')
  }
  return currentDate
}

export function processingResult(item) {
  return {
    id: item?.pk || '', // id
    concated_code: item?.concated_code || '', // составной код

    line_business: item?.service?.service?.line?.line_business?.title || '', // линия бизнеса
    line_business_code: item?.service?.service?.line?.line_business?.code || 0, // LOB
    line_business_pk: item?.service?.service?.line?.line_business?.pk || '', // line business id

    service_line: item?.service?.service?.line?.title || '', // линейка услуг
    service_line_code: item?.service?.service?.line?.code || 0, // service_code.line
    service_line_pk: item?.service?.service?.line?.pk || '', // линейка услуг id

    num_clients: item?.service?.service?.line?.num_clients || 0, // clients count

    service: item?.service?.service?.title || '', // услуга
    service_code: item?.service?.service?.code || 0, // service_code
    service_pk: item?.service?.service?.pk || '', // услуга id

    service_element: item?.service?.title || '', // элемент услуги
    service_element_code: item?.service?.code || 0, // service_code.el
    service_element_pk: item?.service?.pk || '', // элемент услуги id

    tariff: item?.title || '', // тариф
    tariff_code: item?.code || 0, // TARRIF
    tariff_pk: item?.pk || '', // тариф id

    tariff_element: item?.element?.title || '', // эл. тарификации
    tariff_element_pk: item?.element?.pk || '', // эл. тарификации id

    tariff_unit: item?.element?.unit?.unit || '', // ед. тарификации
    tariff_unit_pk: item?.element?.unit?.pk || '', // ед. тарификации id

    tariff_type: item?.element?.charge_type?.charge_type || '', // тип тарифа
    tariff_type_pk: item?.element?.charge_type?.pk || '', // тип тарифа id

    flat_rate: item?.element?.flat_rate || false, // перерасчет
    price: item?.element?.price || '', // базовая цена
    is_available: item?.service?.service?.is_available || false, // доступна для подключения

    created_at: dateFotmattedForTable(item?.created_at) || '', // дата создания
    archived_at: dateFotmattedForTable(item?.archived_at) || '', // дата архивирования

    start_at: dateFotmattedForTable(item?.service?.service?.start_at) || '', // дата старта
    end_at: dateFotmattedForTable(item?.service?.service?.end_at) || '', // дата окончания
    start_at_special_formatted: dateFotmattedForModal(item?.service?.service?.start_at) || '', // дата старта (отформатированная для модалки)
    end_at_special_formatted: dateFotmattedForModal(item?.service?.service?.end_at) || '', // дата окончания (отформатированная для модалки)


    max_discount: item?.element?.max_discount || null, // максимальная скидка
    readable_freq: item?.element?.update_frequency?.readable_freq || null, // частота обновления text

    update_frequency: {
      readable_freq: item?.element?.update_frequency?.readable_freq || null,
      pk: item?.element?.update_frequency?.pk || null,
      freq: item?.element?.update_frequency?.freq || null,
      base: item?.element?.update_frequency?.base || null,
    }, // частота обновления
    // 
    cost_price: item?.element?.cost_price || 0.00, // базовая цена
    comment: item?.comment // комментарий
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

export function checkValuesFields(values = {}, exceptionKeys = []) {
  const newVals = { ...values };
  exceptionKeys.map(key => delete newVals[key])

  const valsList = Object.values(newVals)
  const index = valsList.findIndex(val => val === '' || val === null)
  const isFull = index === -1

  return isFull
}

export const addZeroAndRound = (val = 0) => {
  const resOfRound = (Math.round(val * 100) / 100)
  let stringRes = ''
  if (resOfRound.toString().includes('.')) {
    stringRes = resOfRound.toString().split('.')
  }
  else stringRes = resOfRound.toString().split(',')

  if (!stringRes[1]) {
    stringRes[1] = '00'
  }
  else if (stringRes[1].length === 1) {
    stringRes[1] += '0'
  }

  return stringRes.join('.')
}

export function handlingBoolean(value) {
  return [...value].map(item => {
    let newVal;
    if (item.includes('true')) {
      newVal = 'true'
    }
    if (item.includes('false')) {
      newVal = 'false'
    }
    return newVal;
  })
}

export function useNetwork() {
  const [isOffline, setNetwork] = useState(!window.navigator.onLine);
  useEffect(() => {
    window.addEventListener('offline', () => setNetwork(!window.navigator.onLine));
    window.addEventListener('online', () => setNetwork(!window.navigator.onLine));
  }, []);
  return isOffline;
};

export default handlingBoolean