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

export {
  formatDateToInput,
  cleanTheDate,
  formatDateToBack
}