import dayjs from './day'

require('dayjs/locale/ru')

const cleanTheDate = (dateStr) => {
  return dayjs(dateStr).locale('ru').format('LLL')
}

const formatDateToInput = () => {
  return dayjs(new Date()).format('YYYY-MM-DDTHH:mm')
}

const formatDateToBack = (dateStr) => {
  if (dateStr) {
    return dayjs(dateStr).format('YYYY-MM-DDTHH:mm:ss')
  }
  else {
    return dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss')
  }
}

function dateFotmattedForTable(date = new Date()) {
  let currentDate = ''
  if (dayjs(date).isValid()) {
    currentDate = dayjs(date).format('DD.MM.YYYY HH:mm:ss')
  }
  else {
    currentDate = dayjs(new Date()).format('DD.MM.YYYY HH:mm:ss')
  }
  return dayjs(date).format('DD.MM.YYYY HH:mm:ss')
}

function dateFotmattedForMakeDelivery(date = new Date()) {
  return dayjs(date).format('DD.MM.YYYY')
}

function dateFotmattedForMakeDeliveryBack(date = new Date()) {
  return dayjs(date).format('YYYY-MM-DD')
}

function dateFotmattedForModal(date) {
  let currentDate = ''
  if (dayjs(date).isValid()) {
    currentDate = dayjs(date).format('YYYY-MM-DDTHH:mm')
  }
  return currentDate
}

export {
  formatDateToInput,
  cleanTheDate,
  formatDateToBack,
  dateFotmattedForTable,
  dateFotmattedForModal,
  dateFotmattedForMakeDelivery,
  dateFotmattedForMakeDeliveryBack
}