import dayjs from './day'

require('dayjs/locale/ru')

const cleanTheDate = (dateStr) => {
  return dayjs(dateStr).locale('ru').format('LLL')
}

const formatDateToInput = () => {
  return dayjs(new Date()).format('YYYY-MM-DDTHH:mm')
}

export {
  formatDateToInput,
  cleanTheDate
}